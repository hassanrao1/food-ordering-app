const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express()
const server = http.createServer(app);
const authRoutes = require("./routes/auth");


app.use("/", express.static(path.resolve(path.join(__dirname, "./web/build"))));
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





const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is running on: ", PORT);
});

