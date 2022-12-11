function setup() {
  let myCanvas=createCanvas(400, 400);
  myCanvas.parent("sketch") //adds the canvas to the element called sketch
  background(255,135,0);
}

function draw() {
  //background(255,135,0);
  noFill()
  stroke(40,40,150)
  strokeWeight(20)
  if(mouseIsPressed){
    line(pmouseX, pmouseY,mouseX, mouseY,20)
  }
}