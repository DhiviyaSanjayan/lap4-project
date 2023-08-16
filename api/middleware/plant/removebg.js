const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function removebg(req, res, next) {
    if (!req.file) {
        // No file was uploaded
        return res.status(400).send('No file uploaded');
    }

    console.log(req.file)

    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(req.file.path));

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': process.env.REMOVEBG_KEY,
            },
            encoding: null
        });

        if (response.status !== 200) {
            console.error('Error:', response.status, response.statusText);
            return res.status(response.status).send(response.statusText);
        }

        // Save the processed image (optional)
        fs.writeFileSync(`uploads/plants/${req.file.filename.split(".")[0]}.png`, response.data);
        req.file.filename = `${req.file.filename.split(".")[0]}.png`

        // Delete the original uploaded file (optional but recommended to free up storage)
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        next();

    } catch (error) {
        console.error('Request failed:', error);
        res.status(500).send('Remove background failed.');
    }
}

module.exports = removebg;
