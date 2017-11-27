const express = require('express');

const app = express();

app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get(['/web', '/web.html'], (req, res) => {
  res.sendFile(__dirname + '/web.html');
});

app.get(['/branding', '/branding.html'], (req, res) => {
  res.sendFile(__dirname + '/branding.html');
});

app.get(['/illustration', '/illustration.html'], (req, res) => {
  res.sendFile(__dirname + '/illustration.html');
});

app.use(express.static('public'))

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
