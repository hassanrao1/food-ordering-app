const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const server = http.createServer(app);
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");
const { SERVER_SECRET } = require("./core/index");
const multer = require("multer");
const storage = multer.diskStorage({
  // https://www.npmjs.com/package/multer#diskstorage
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`
    );
  },
});
var upload = multer({ storage: storage });

var admin = require("firebase-admin");

var serviceAccount = require("./config/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://calculator-2a862.firebaseio.com",
});

const bucket = admin.storage().bucket("gs://calculator-2a862.appspot.com");

const { userModel, orderModel, productModel } = require("./dbrepo/index");

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  cors({
    origin: "https://food-mania.herokuapp.com",
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin: https://food-mania.herokuapp.com");
//   res.header("Access-Control-Allow-Credentials: true");
//   res.header("Access-Control-Allow-Methods: GET, POST");
//   res.header("Access-Control-Allow-Headers: Content-Type, *");
//   next();
// });

app.use("/", express.static(path.resolve(path.join(__dirname, "./web/build"))));

app.use("/auth", authRoutes);

// middleware;
app.use(function (req, res, next) {
  console.log("req.cookies: ", req.cookies);
  if (!req.cookies.jToken) {
    res.status(401).send("include http-only credentials with every request");
    return;
  }
  jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
    if (!err) {
      const issueDate = decodedData.iat * 1000; //it converts milliseconds to seconds
      const nowDate = new Date().getTime();
      const diff = nowDate - issueDate; // 86,400,00 milliseconds = 24 hrs

      // token will expire after 1 min
      if (diff > 3000000) {
        res.status(401).send("token expired");
      } else {
        // issue new token
        var token = jwt.sign(
          {
            id: decodedData.id,
            name: decodedData.name,
            email: decodedData.email,
            role: decodedData.role,
          },
          SERVER_SECRET
        );
        res.cookie("jToken", token, {
          maxAge: 86_400_000,
          httpOnly: true,
        });
        req.body.jToken = decodedData;
        req.headers.jToken = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

app.get("/profile", (req, res, next) => {
  console.log("dashboard body", req.body);
  console.log("dashboard body", req.body.jToken.id);

  userModel.findById(
    req.body.jToken.id,
    "email name role",
    function (err, data) {
      if (!err) {
        res.send({
          status: 200,
          userData: data,
        });
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    }
  );
});

app.post("/placeorder", (req, res) => {
  console.log(req.body.order);
  if (!req.body.order) {
    res.status(403).send(`
              please send order in array in json body.`);
    return;
  }

  userModel.findById(req.body.jToken.id, "email name", (err, user) => {
    if (!err) {
      console.log("order user", user);

      orderModel
        .create({
          orderDetails: req.body.order,
          orderTotal: req.body.total,
          name: user.name,
          email: user.email,
          phone: req.body.phone,
          address: req.body.address,
          remarks: req.body.remarks,
          status: "pending",
        })
        .then((data) => {
          console.log("order placed", data);
          res.send({
            message: "your order has been placed",
            data: data,
          });
        })
        .catch((err) => res.status(500).send("an error occurred" + err));
    } else {
      res.status(500).send("db error");
    }
  });
});
app.get("/orders", (req, res) => {
  userModel.findById(
    req.body.jToken.id,
    "email name role",
    function (err, data) {
      if (!err) {
        orderModel.find((err, orders) => {
          if (!err) {
            res.send({
              status: 200,
              orders: orders,
              // orderTotal:orders.orderTotal
            });
          } else {
            res.status(401).send("no orders");
          }
        });
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    }
  );
});

app.get("/myorders", (req, res) => {
  console.log(req.body);
  orderModel.find({ email: req.body.jToken.email }, (err, data) => {
    if (!err) {
      res.send({
        userOrders: data,
      });
    } else {
      res.send({
        message: "no orders",
      });
    }
  });
});

app.post("/upload", upload.any(), (req, res) => {
  // console.log("req.body: ", JSON.parse(req.body.myDetails));
  // let userEmail = JSON.parse(req.body.myDetails);
  // console.log("req.email: ", req.body.myDetails);
  console.log("req.files: ", req.files);

  console.log("uploaded file name: ", req.files[0].originalname);
  console.log("file type: ", req.files[0].mimetype);
  console.log("file name in server folders: ", req.files[0].filename);
  console.log("file path in server folders: ", req.files[0].path);

  bucket.upload(
    req.files[0].path,
    {
      destination: `${new Date().getTime()}-new-image.png`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
    },
    function (err, file, apiResponse) {
      if (!err) {
        // console.log("api resp: ", apiResponse);

        // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
        file
          .getSignedUrl({
            action: "read",
            expires: "03-09-2491",
          })
          .then((urlData, err) => {
            if (!err) {
              console.log("public downloadable url: ", urlData[0]); // this is public downloadable url
              userModel.findOne(
                { email: req.headers.jToken.email },
                (err, data) => {
                  if (!err) {
                    console.log("userFound", data);
                    productModel
                      .create({
                        foodName: req.body.productName,
                        amount: 0,
                        quantity: 0,
                        image: urlData[0],
                        actualPrice: req.body.productAmount,
                        lessThanZero: false,
                        inCart: false,
                      })
                      .then((data) => {
                        console.log("product data", data);
                        res.send({
                          message: "product added",
                          products: data,
                        });
                      });
                  } else {
                    console.log("user not found");
                  }
                }
              );

              // // delete file from folder before sending response back to client (optional but recommended)
              // // optional because it is gonna delete automatically sooner or later
              // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
              // try {
              //   fs.unlinkSync(req.files[0].path);
              //   //file removed
              // } catch (err) {
              //   console.error(err);
              // }
              // res.send({
              //   message: "ok",
              //   url: urlData[0],
              // });
            }
          });
      } else {
        console.log("err: ", err);
        res.status(500).send();
      }
    }
  );
});

app.get("/Products", (req, res) => {
  userModel.findById(req.body.jToken.id, "email name", function (err, data) {
    if (!err) {
      productModel.find((err, products) => {
        if (!err) {
          res.send({
            status: 200,
            products: products,
            // orderTotal:orders.orderTotal
          });
        } else {
          res.status(401).send("no products");
        }
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});
app.patch("/acceptOrder", (req, res, next) => {
  userModel.find({ email: req.body.jToken.email }, (err, user) => {
    if (!err) {
      orderModel.findById({ _id: req.body.id }, (err, data) => {
        if (data) {
          data.updateOne({ status: "accepted" }, {}, (err, updated) => {
            if (updated) {
              res.status(200).send({
                message: "Order accepted",
              });
            } else {
              res.status(501).send({
                message: "server error",
              });
            }
          });
        } else {
          res.status(403).send({
            message: "Could not find the order",
          });
        }
      });
    } else {
      res.status(501).send({
        message: "user could not be found",
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is running on: ", PORT);
});
