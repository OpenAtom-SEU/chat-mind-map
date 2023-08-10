const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Directory for static files
app.use(express.static(path.join(__dirname, '/')));

// `/` -> `index.html`
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
