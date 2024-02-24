const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.set("view engine", "ejs");

//Routes

app.post("/mypost", async (req, res) => {
  // let file = req.files.file;
  // result = cloudinary.uploader.upload(file, { folder: "users" });

  let imageArray = [];
  let result;
  if (req.files) {
    for (let index = 0; index < imageArray.length; index++) {
      result = await cloudinary.uploader.upload(
        req.files.files[index].tempFilePath,
        { folder: "user" }
      );
      console.log(result);

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  const details = {
    fname: req.body.email,
    lname: req.body.password,
    imageArray,
  };
  console.log(result);
  res.send(details);
});
app.get("/mygetform", (req, res) => {
  res.render("getForm");
});
app.get("/mypostform", (req, res) => {
  res.render("postForm");
});

module.exports = app;
