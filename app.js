const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const path = require("path");
const router = require("./routers/router");
const subjectRouter = require("./routers/subjectRouter");

app.use(express.json());

app.use("/uploads/images", express.static("uploads/images"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.use("/api/students", router);

app.use("/api/subjects", subjectRouter);

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {});
  }

  res
    .status(err.code || 500)
    .json(err.message || { message: "Something went wrong" });
});

try {
  mongoose
    .connect(
      "mongodb+srv://ClassroomUser:CkEaiwSfsu7bn7xC@cluster0.gecug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      app.listen(5000, () => {
        console.log("Running on Port 5000");
      });
    });
} catch (err) {
  console.log(err);
}
