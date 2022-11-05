function setup() {
  let myCanvas=createCanvas(400, 400);
  myCanvas.parent("sketch")
}

function draw() {
  background(255,135,0);
  ellipse(mouseX, mouseY,100)
}