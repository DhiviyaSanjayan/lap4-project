const multer = require("multer");

// Set up storage for uploaded files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/${process.env.NODE_ENV == "test" ? "plants_test" : "plants"}`);
  },
  filename: function (req, file, cb) {
    //storing file like this means you can open the uploaded file without renaming it
    cb(null, `${Date.now()}--${file.originalname}`);
  }
});

// Create the upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
