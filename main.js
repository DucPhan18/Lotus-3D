let bloomProgress = 0.2; // Điều khiển mức độ bung của cánh hoa
let sizeProgress = 0; // Điều khiển mức độ phóng to của hoa

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  angleMode(DEGREES);
  stroke(205, 50, 100);
  strokeWeight(4);
  noFill();
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
}

function draw(){
  background(230, 50, 15);
  orbitControl(0, 1);
  translate(0, 50, 0);
  rotateX(-60);
  rotateZ(-5);
  rotateY(-(frameCount * 20 / 60));

  if (bloomProgress < 1) bloomProgress += 0.003;
  if (sizeProgress < 1) sizeProgress += 0.002; 
  
  lotus(bloomProgress, sizeProgress);
}

let size = 1;
let dispersion = 0.05
let petal_length = 2.2; // (2.2, 2.3)
let petal_curvature = 2.2; // defaut: 2.3, The larger the number, the more curved the petals.

function lotus(bloom, scale){
  for(let r = 0; r <= size * scale; r += dispersion){
    beginShape(POINTS);

    let hueValue = map(r, 0, size, 0, 200);
    let brightnessValue = map(r, 0, size, 100, 90); 
    let saturationValue = map(r, 0.05, size, 20, 100);
    stroke(hueValue, saturationValue, brightnessValue);
    
    for(let theta = 0; theta <= 180*8; theta += 1.5){
      let phi = (180/2.5)*Math.exp(-theta/(6.5*180));
      
      let petalFactor = map(sin(theta * 0.02 + bloom * PI), -1, 1, 0.4, 1);
      let petalCut = (0.5 + abs(asin(sin(petal_length * theta)) + 120 * sin(2.25 * theta)) / 360) * petalFactor;
      let hangDown = petal_curvature * pow(r, 2) * pow(0.8 * r - 1, 2) * sin(phi) * petalFactor;

      if(0 < petalCut * (r * sin(phi) + hangDown * cos(phi))){
        let scaleFactor = (min(windowWidth, windowHeight) / 2.7) * scale; // Kích thước tăng dần
        let pX = scaleFactor * (1 - theta / 10000) * petalCut * (r * sin(phi) + hangDown * cos(phi)) * sin(theta);
        let pY = -scaleFactor * (1 - theta / 10000) * petalCut * (r * cos(phi) - hangDown * sin(phi));
        let pZ = scaleFactor * (1 - theta / 10000) * petalCut * (r * sin(phi) + hangDown * cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
