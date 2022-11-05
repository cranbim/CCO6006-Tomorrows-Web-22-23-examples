var connection = new WebSocket('ws://127.0.0.1:8011/');

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
    // console.log('received: ', parsed?parsed:e.data);
    if(parsed.value){
        value=parseInt(parsed.value,10)
    }
};

var value=0;

function setup(){
    createCanvas(400,400)
}

function draw(){
    background(0);
    ellipse(width/2, height/2 ,map(value,0,255,20,width))
}