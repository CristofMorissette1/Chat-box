// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require("uuid");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const userConnected = {
    counter: wss.clients.size,
    type: "userCounter"
    }
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(userConnected))
  })

ws.on('message', (message) => {
  let messageObj = JSON.parse(message);
  messageObj.id = uuid()
  switch(messageObj.type) {
    case "postMessage":
    messageObj.type = 'incomingMessage'
    wss.clients.forEach(function each(client) {
     client.send(JSON.stringify(messageObj))
    })
    break;
    case "postNotification":
    messageObj.type = 'incomingNotification'
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(messageObj))
    })
    break;
  }
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
  const userConnected = {
    counter: wss.clients.size,
    type: "userCounter"
    }
    console.log('hello')
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(userConnected))
    });
  })
})