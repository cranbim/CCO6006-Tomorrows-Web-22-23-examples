//From ITPNYU p5.ble.js examples

var connection = new WebSocket('ws://127.0.0.1:8011/');
// var dataPoints=[];

connection.onopen = function () {
  console.log("I am connected");
};

connection.onerror = function (error) {
  console.log('WebSocket Error ', error);
};

function tryParseJSONObject (jsonString){
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  }
  catch (e) { }

  return false;
};

connection.onmessage = function (e) {
  let parsed=tryParseJSONObject(e.data);
  console.log('received: ', parsed?parsed:e.data);
  if(parsed.rgb){
    document.body.style.backgroundColor=parsed.rgb;
  }
};

// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuids = [
  // "19b10010-e8f2-537e-4f6c-d104768a1214",
  // "19b10010-e8f2-537e-4f6c-d104768a1215",
  "6920b5f4-5df2-11ed-9b6a-0242ac120002",
  "6920c3dc-5df2-11ed-9b6a-0242ac120002"
]
// let myCharacteristic;
// let myValue = 0;
// let myBLE;
let bles=[];
let currentBle=0;

function setup() {
  colorMode(HSB, 255);
  // Create a p5ble class
  // myBLE = new p5ble();

  createCanvas(200, 200);
  textSize(20);
  textAlign(CENTER, CENTER);

  bles[0]=new Nano33BLEData(0,serviceUuids[0],'first nano')
  bles[1]=new Nano33BLEData(1,serviceUuids[1],'second nano')
  // Create a 'Connect' button
  // const connectButton = createButton('Connect')
  // connectButton.mousePressed(connectToBle);
}

// function connectToBle() {
//   // Connect to a device by passing the service UUID
//   myBLE.connect(serviceUuid, gotCharacteristics);
// }

// // A function that will be called once got characteristics
// function gotCharacteristics(error, characteristics) {
//   if (error) console.log('error: ', error);
//   console.log('characteristics: ', characteristics);
//   myCharacteristic = characteristics[0];
//   // Read the value of the first characteristic
//   myBLE.read(myCharacteristic, gotValue);
// }

// // A function that will be called once got values
// function gotValue(error, value) {
//   if (error) console.log('error: ', error);
//   console.log('value: ', value);
//   myValue = value;
//   // After getting a value, call p5ble.read() again to get the value again
//   myBLE.read(myCharacteristic, gotValue);
//   // You can also pass in the dataType
//   // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
//   // myBLE.read(myCharacteristic, 'string', gotValue);
// }

function draw() {
  background(0)
  if(bles[0].value || bles[0].value === 0){
  // background(bles[0].value,255,255);
  fill(bles[0].value,255,255)
  rect(0,0,width, height/2)
  // Write value on the canvas
  fill(255)
  text(bles[0].value, 100,height*0.25);
  }
  if(bles[1].value || bles[1].value === 0){
    // background(bles[0].value,255,255);
    fill(bles[0].value,255,255)
    rect(0,height/2,width, height/2)
    // Write value on the canvas
    fill(255)
    text(bles[0].value, 100,height*0.25);
    text(bles[1].value, 100,height*0.75);
    }
}

function Nano33BLEData(id,serviceUuid,label){
    let me=this
    this.connectButton = createButton('Connect')
    this.connectButton.mousePressed(connectToBle)
    let ble=new p5ble()
    this.characteristic=null
    this.value=-1
  
  
  function connectToBle() {
    // Connect to a device by passing the service UUID
    console.log(serviceUuid)
    ble.connect(serviceUuid, gotCharacteristics);
  }
  
  function gotCharacteristics(error, characteristics) {
    if (error) console.log('error: ', error);
    console.log('characteristics: ', characteristics);
    this.characteristic = characteristics[0];
    // Read the value of the first characteristic
    ble.read(this.characteristic, gotValue);
  }

  function gotValue(error, value) {
    if (error) console.log('error: ', error);
    console.log('value: ', value);
    connection.send(JSON.stringify({
      deviceID: id,
      value:value
    }));
    me.value = value;
    // After getting a value, call p5ble.read() again to get the value again
    ble.read(this.characteristic, gotValue);
  }
  
}