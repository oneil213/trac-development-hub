const cloud = require('../config/cloud.config');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage }= require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config(cloud);
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "tracdev",
    filename: function (req, file, cb) {
        cb(undefined, file.originalname);
      },
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
const parser = multer({ storage: storage });

const cloudinaryMutter = {
    parser:  parser,

  
  };

  module.exports = cloudinaryMutter;





