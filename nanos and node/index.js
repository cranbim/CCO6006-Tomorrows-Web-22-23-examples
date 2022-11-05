// var http = require('http');
var nextConnectionID=0;
var connections = [];
var currentBrowser=null;


const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8011 })
wss.on('connection', ws => {
  console.log((new Date()) + "connection opened");
  ws.send(JSON.stringify('Nanos and Node Server says Hi!'));
  
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

