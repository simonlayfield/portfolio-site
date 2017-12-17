const express = require('express');

const app = express();
app.use(express.static('public'))

app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get(['/web', '/web.html'], (req, res) => {
  res.sendFile(__dirname + '/public/web.html');
});

app.get(['/branding', '/branding.html'], (req, res) => {
  res.sendFile(__dirname + '/public/branding.html');
});

app.get(['/illustration', '/illustration.html'], (req, res) => {
  res.sendFile(__dirname + '/public/illustration.html');
});

app.get(['/photo', '/photo.html'], (req, res) => {
  res.sendFile(__dirname + '/public/photo.html');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
