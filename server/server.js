const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'A R Surgical API' });
});

app.post('/api/enquiry', (req, res) => {
  const { name, mobile, message } = req.body;
  // yahan future me DB/email/WhatsApp webhook connect kar sakte ho
  res.json({ success: true, received: { name, mobile, message } });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
