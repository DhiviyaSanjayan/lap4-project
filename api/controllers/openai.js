const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations';
const API_KEY = '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'; // Replace with your API key

class openAIcontroller {
    static async generate(req, res) {
        try {
            const headers = {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            };
            const response = await axios.post(OPENAI_API_URL, req.body, {
                headers: headers
            });

            res.json(response.data);
        } catch (error) {
            res.status(500).json({ message: "Failed to generate image" });
        }
    }
};

module.exports = openAIcontroller
