require("dotenv").config();
const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations';
const API_KEY = process.env.OPENAI_KEY; // Replace with your API key

class openAIcontroller {
    static async generate(req, res) {
        try {
            const headers = {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            };
            console.log('Image generation started.')
            const response = await axios.post(OPENAI_API_URL, req.body, {
                headers: headers
            });
            console.log('Image generation success.')
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ message: "Failed to generate image" });
        }
    }
};

module.exports = openAIcontroller
