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

const { userModel } = require("./dbrepo/index");

app.use("/", express.static(path.resolve(path.join(__dirname, "./web/build"))));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./web/build"));
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
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

app.get("/dashboard", (req, res, next) => {
  console.log("dashboard body", req.body);
  console.log("dashboard body", req.headers.cookie);

  userModel.findOne(req.body.jToken.id, "email", function (err, data) {
    if (!err) {
      res.send({
        userData: data,
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is running on: ", PORT);
});
