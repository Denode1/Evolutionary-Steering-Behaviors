let v = [];
let food = [];
let poison = [];

function setup() {
  createCanvas(640, 360);
  for(let i = 0; i < 50; ++i){
    let x = random(width);
    let y = random(height);
    v[i] = new Vehicle(x, y);
  }
  for(let i = 0; i < 40; ++i) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x, y));
  }
  for(let i = 0; i < 20; ++i) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x, y));
  }
}

function draw() {
  background(51);

  let mouse = createVector(mouseX, mouseY);
  if(random(1) < 0.1) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x, y));
  }
  if(random(1) < 0.01) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x, y));
  }

  // Draw an ellipse at the mouse position

  for(let i = 0; i < food.length; ++i) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }
  for(let i = 0; i < poison.length; ++i) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  // Call the appropriate steering behaviors for our agents
  for(let i = v.length - 1; i >= 0; --i){
    v[i].boundaries();
    v[i].behaviors(food, poison);
    //v.seek(food);
    v[i].update();
    v[i].display();

    let newVehicle = v[i].clone();
    if(newVehicle != null) {
      v.push(newVehicle);
    }

    if(v[i].dead()) {
      let x = v[i].position.x;
      let y = v[i].position.y;
      food.push(createVector(x, y));

      v.splice(i, 1);
    }
  }
}

function mouseDragged() {
  v.push(new Vehicle(mouseX, mouseY));
}