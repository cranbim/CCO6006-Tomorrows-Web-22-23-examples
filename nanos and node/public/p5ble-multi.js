//From ITPNYU p5.ble.js examples

// const { text } = require("express");

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
const numBles=2;
let potentialBles=[];
let currentBle=0;

function setup() {
  colorMode(HSB, 255);
  // Create a p5ble class
  // myBLE = new p5ble();

  createCanvas(200, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  let hStep=height/numBles;
  for(let i=0; i<numBles; i++){
    potentialBles[i]=new Nano33BLEData(i,serviceUuids[i],'nano'+nf(i,2,0),0,i*hStep,width, hStep);
  }
  // potentialBles[0]=new Nano33BLEData(0,serviceUuids[0],'nano+0')
  // potentialBles[1]=new Nano33BLEData(1,serviceUuids[1],'nano+1')
  // Create a 'Connect' button
  // const connectButton = createButton('Connect')
  // connectButton.mousePressed(connectToBle);
}



function draw() {
  background(0)
  let newConnections=false;
  for(let i=0; i<potentialBles.length; i++){
    potentialBles[i].show();
    // console.log("connected?"+potentialBles[i].connected)
    if(potentialBles[i].justConnected()){
      bles.push(potentialBles[i]);
      newConnections=true
    }
  }
  if(newConnections){
    console.log(bles.length)
  }
  // if(bles[0].value || bles[0].value === 0){
  // // background(bles[0].value,255,255);
  // fill(bles[0].value,255,255)
  // rect(0,0,width, height/2)
  // // Write value on the canvas
  // fill(255)
  // text(bles[0].value, 100,height*0.25);
  // }
  // if(bles[1].value || bles[1].value === 0){
  //   // background(bles[0].value,255,255);
  //   fill(bles[0].value,255,255)
  //   rect(0,height/2,width, height/2)
  //   // Write value on the canvas
  //   fill(255)
  //   text(bles[0].value, 100,height*0.25);
  //   text(bles[1].value, 100,height*0.75);
  // }
  // if(bles.length>0){
  //   console.log(currentBle,bles[currentBle].gotData)
  // }
  if(bles.length>0){
    if(bles[currentBle].gotData){
      // currentBle=(currentBle+1)%bles.length;
      console.log('fetch from: '+currentBle)
      bles[currentBle].fetchValue();
    }
  }
}



function Nano33BLEData(id,serviceUuid,label,x,y,w,h){
    let me=this
    this.connectButton = createButton('Connect')
    this.connectButton.mousePressed(connectToBle)
    let ble=new p5ble()
    this.characteristic=null
    this.value=-1
    this.gotData=false
    this.connected=false;
    let didJustConnect=false;

  this.justConnected=function(){
    let res=didJustConnect;
    didJustConnect=false;
    return res;
  }
  
  this.show=function(){
    push()
    translate(x,y)
    if(this.connected){
      fill(this.value,255,255)
    } else {
      fill(0,0,128)
    }
    rect(0,0,w,h)
    fill(0,0,255)
    text(label,w*0.2,h*0.4)
    text(this.value,w*0.2,h*0.9)
    pop()
  }
  
  function connectToBle() {
    // Connect to a device by passing the service UUID
    console.log(serviceUuid)
    ble.connect(serviceUuid, gotCharacteristics);
  }
  
  function gotCharacteristics(error, characteristics) {
    if (error) console.log('error: ', error);
    console.log('characteristics: ')
    console.log(characteristics);
    me.characteristic = characteristics[0];
    me.connected=true;
    me.gotData=true;
    didJustConnect=true;
    // Read the value of the first characteristic
    //ble.read(this.characteristic, gotValue);
  }

  this.fetchValue=function(){
    // this.gotData=false;
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
    me.gotData=true;
    // After getting a value, call p5ble.read() again to get the value again
    // ble.read(this.characteristic, gotValue);
  }
  
}