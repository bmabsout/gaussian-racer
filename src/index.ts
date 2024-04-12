import _ from 'lodash'
import * as p5Globals from 'p5/global'
import 'p5'

let theShader;
let pg;

function preload() {
  // load the shader
  theShader = loadShader('shaders/basic.vert', 'shaders/basic.frag');
}

function setup() {
  // set fps 
  frameRate(1)
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL)
  pg = createGraphics(windowWidth, windowHeight, WEBGL)
  // background(0)
}

function drawShader() {
  theShader.setUniform('u_resolution', [windowWidth, windowHeight]);
  theShader.setUniform('gaussian', [0.0, 0.0]);
  pg.clear(0)
  pg.shader(theShader);
  pg.rect(-pg.width/2.0, -pg.height/2.0, pg.width, pg.height)
  image(pg, -width / 2.0, -height / 2.0, width, height)
}

function draw() {
  clear()
  // background(0)
  fill(0)
  rect(-width/2.0, -height/2.0, width/2.0, height/2.0)
  // resetShader()

  stroke(0)
  line(0, 0, width, height)
  drawShader()
  
  // fill("blue")
  // ellipse(width/2.0,height/2.0,height/2,height/2)
  // fill("blue")
  
  // rect gives us some geometry on the screen
  
}


(window as any).setup = setup; // for some reason semicolon is needed here
(window as any).draw = draw;
(window as any).preload = preload;
