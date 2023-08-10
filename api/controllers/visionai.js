
const vision = require('@google-cloud/vision');
//const multer = require('../middleware/upload');

class visionaiController {
  async upload(req, res) {
    try {

      // if (!req.file) {
      //   return res.status(400).json({ error: 'No file uploaded' });
      // }

      // // File uploaded successfully
      // const filename = req.file.filename;
      // try {
      //   // Creates a client
      //   const client = new vision.ImageAnnotatorClient();

      //   // Performs label detection on the image file
      //   const [result] = await client.labelDetection('./uploads/rose.jpg');
      //   const labels = result.labelAnnotations;
      //   console.log('Labels:');
      //   labels.forEach(label => console.log(label.description));
      res.status(200).json({ 'message': 'success' });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = visionaiController;
