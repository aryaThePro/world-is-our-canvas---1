var canvas;
var database;

var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup(){
  canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  database = firebase.database();

  var ref = database.ref('drawings');
  ref.on('value', gotData,errData);

  
}

function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function draw(){
  background(0);

  if (isDrawing){
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }

  beginShape();
  stroke(255);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[i].x, path[i].y)
    }
    endShape();
  }
}

function saveDrawing(){
  var ref = database.ref('drawings');
  var data = {
    name: "Dan",
    drawing: drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status){
    console.log(status);
  }

}

function gotData(data){
  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    console.log(key);
  }
}

function errData(err){
  console.log(err);
}