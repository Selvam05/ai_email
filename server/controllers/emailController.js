const { generateEmail } = require('../services/openaiService');

async function generateEmailController(req, res) {
  try {
    console.log('Received request body:', req.body); // Debugging log
    const { recipientName, purpose, tone, notes } = req.body;
    if (!recipientName || !purpose || !tone) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    const email = await generateEmail({ recipientName, purpose, tone, notes });
    res.json({ success: true, email });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { generateEmailController };
