const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Create the upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
