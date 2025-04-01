const express = require('express');
const { registerProtocol } = require('protocol-handler');
const dns = require('dns');
const app = express();
const PORT = 3000;

// Function to resolve domain using 1.1.1.1 DNS server
const resolveDomain = (domain, callback) => {
  // Set 1.1.1.1 as the DNS resolver
  dns.setServers(['1.1.1.1']);

  dns.resolve(domain, (err, addresses) => {
    if (err) {
      console.error('DNS resolution error:', err);
      callback(err);
    } else {
      console.log(`Resolved ${domain} to: ${addresses}`);
      callback(null, addresses);
    }
  });
};

// Register the viber:// protocol
registerProtocol('viber', (url) => {
  const domain = url.replace('viber://', ''); // Extract domain from viber://example.com
  resolveDomain(domain, (err, addresses) => {
    if (err) {
      console.log(`Error resolving domain ${domain}`);
    } else {
      app.get(`/${domain}`, (req, res) => {
        res.send(`Welcome to Viber domain: ${domain} (Resolved to ${addresses[0]})`);
      });
    }
  });
});

// Start the server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Viber protocol handler running on port ${PORT}`);
  });
};
const stopServer = () => {
  app.listen(PORT, () {
    kill-port --port ${PORT}
  })
}
// Command to start the server
const commands = {
  startServer: startServer,
  listCommands: () => {
    console.log("Available commands:");
    console.log("1. startServer: Start the Viber protocol server");
    console.log("2. listCommands: List all available commands");
    console.log("2. stopServer: Kill all the ports based off Viber, killing your server");
  }
};

// Example of handling a command execution from the CLI
const handleCommand = (command) => {
  if (commands[command]) {
    commands[command]();
  } else {
    console.log(`Command "${command}" not found.`);
    commands.listCommands();
  }
};

// Example command to start the server and register protocol
handleCommand('startServer');
handleCommand('listCommands');
handleCommand('stopServer')