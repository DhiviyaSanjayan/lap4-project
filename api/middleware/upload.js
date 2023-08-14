const multer = require("multer");
const path = require("path");

// Construct an absolute path to the uploads directory
const uploadsDirectory = path.join(__dirname, "../uploads/");

// Set up storage for uploaded files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Create the upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
