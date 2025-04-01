const { registerProtocol } = require('protocol-handler');
const express = require('express');

const app = express();
const PORT = 3000;

// Register the custom viber:// protocol without logging
registerProtocol('viber', (url) => {
  // Direct handling of the viber:// request
  const domain = url.replace('viber://', ''); // Extract domain from viber://example.com
  app.get(`/${domain}`, (req, res) => {
    res.send(`Welcome to Viber domain: ${domain}`); // Display the Viber domain
  });
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Viber handler is running on port ${PORT}`);
});
