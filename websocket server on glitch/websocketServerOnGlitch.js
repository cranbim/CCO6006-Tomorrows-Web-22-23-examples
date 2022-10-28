#!/usr/bin/env node

var port = process.env.PORT || 3000;
const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: port
  });
console.log('listening on :'+port);
wss.on('connection', ws => {
  console.log((new Date()) + "connection opened");
  ws.send(JSON.stringify('Glitch Server says welcome!'));

  
  ws.on('message', message => {
    console.log(`Received message`);
    let msg=JSON.parse(message);
    let msgJ=JSON.stringify(msg);
    console.log(msg);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msgJ);
      }
    });
  })

  ws.on('close', function(reasonCode, description) {
    console.log((new Date()) + 'Client  disconnected.');
  });
})
