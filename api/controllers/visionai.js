
const vision = require('@google-cloud/vision');
const multer = require('../middleware/upload');

class visionaiController {
  static async upload(req, res) {

    //Defining sub functions
    //Change the rgb output to hexcolour
    function rgbToHex(r, g, b) {
      const toHex = (num) => num.toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    //Map the visionAI dominent colour to a colour in color list
    function getNearestColor(hexColor) {
      const colorMap = {
        "#FFFFFF": "white",
        "#FF0000": "red",
        "#964B00": "brown",
        "#FFA500": "orange",
        "#FFFF00": "yellow",
        "#008000": "green",
        "#0000FF": "blue",
        "#800080": "purple",
        "#000000": "black"
      };

      let nearestColor = "unknown";
      let minDistance = Number.MAX_SAFE_INTEGER;

      for (const colorHex in colorMap) {
        const distance = hexColorDistance(hexColor, colorHex);
        if (distance < minDistance) {
          minDistance = distance;
          nearestColor = colorMap[colorHex];
        }
      }

      return nearestColor;
    }

    //calculate the cloest colour
    function hexColorDistance(hex1, hex2) {
      const r1 = parseInt(hex1.substr(1, 2), 16);
      const g1 = parseInt(hex1.substr(3, 2), 16);
      const b1 = parseInt(hex1.substr(5, 2), 16);

      const r2 = parseInt(hex2.substr(1, 2), 16);
      const g2 = parseInt(hex2.substr(3, 2), 16);
      const b2 = parseInt(hex2.substr(5, 2), 16);
      // console.log('hex1', r1, g1, b1)
      // console.log('hex2', r2, g2, b2)

      return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
    }

    //Main function
    try {
      const filename = req.file.filename;
      console.log('File being checked:', filename)

      // Creates a client
      const client = new vision.ImageAnnotatorClient();

      //dominent colours
      const [colourResult] = await client.imageProperties(`./uploads/${filename}`);
      const colors = colourResult.imagePropertiesAnnotation.dominantColors.colors;

      console.log('Dominent colour:', colors[0]);

      const red = colors[0]['color']['red']
      const green = colors[0]['color']['green']
      const blue = colors[0]['color']['blue']

      // Convert RGB to hex
      const hexColor = rgbToHex(red, green, blue);

      // Get nearest color
      const nearestColor = getNearestColor(hexColor);

      console.log(`RGB: (${red}, ${green}, ${blue})`);
      console.log(`Hex Color: ${hexColor}`);
      console.log(`Nearest Color: ${nearestColor}`);

      // Performs label detection on the image file
      const [labelResult] = await client.labelDetection(`./uploads/${filename}`);
      const labels = labelResult.labelAnnotations;

      // console.log('Labels:');
      // labels.forEach(label => console.log(label.description));

      const labelReturn = labels.map((label) => label.description);

      res.status(200).json({ 'label': labelReturn, 'colors': colors, 'dominentColorInHex': hexColor, 'nearestColor': nearestColor });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = visionaiController;
