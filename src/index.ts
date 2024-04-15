import _ from 'lodash'
import * as p5Globals from 'p5/global'
import 'p5'
import { Graphics, Renderer, Shader, Vector } from 'p5'

let theShader: Shader
// let upper: Framebuffer
let lower: Graphics
let renderer: Renderer

function preload() {
  // load the shader
  theShader = loadShader('shaders/basic.vert', 'shaders/basic.frag')
  
}

type Gaussian = {
  mean: Vector,
  std: Vector
}

const gaussians = [
  {mean: new Vector(0.0, 0.0), std: new Vector(.1, .1)},
  {mean: new Vector(0.5, 0.5), std: new Vector(.1, .1)}
]

function gaussiansToData(gaussians: Gaussian[]): [number[][], number[][]] {
  return [_.flatten(gaussians.map(g => [[g.mean.x], [g.mean.y]])),
          _.flatten(gaussians.map(g => [[g.std.x], [g.std.y]]))]
}

let [means, stds] = gaussiansToData(gaussians)

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL)
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0)
  lower = createGraphics(width, height, WEBGL)
  lower.colorMode(RGB, 1.0, 1.0, 1.0, 1.0)
}

function drawShader() {
  const realMouse = [2 * mouseX / width - 1.0, 2 * mouseY / height - 1.0]
  theShader.setUniform('u_resolution', [width, height])
  theShader.setUniform('u_mouse', realMouse)

  theShader.setUniform('lower', lower)
  theShader.setUniform('means', means as any)
  theShader.setUniform('stds', stds as any)
  theShader.setUniform('n', gaussians.length)
  shader(theShader)
  
  
  rect(-width/2.0, -height/2.0, width, height)
}

function draw() {
  lower.background(1.0)
  lower.stroke(0)
  lower.line(0, 0, width, height)
  lower.fill("blue")
  lower.ellipse(width/2.0,height/2.0,height/2,height/2)
  drawShader()
}


(window as any).setup = setup; // for some reason semicolon is needed here
(window as any).draw = draw;
(window as any).preload = preload;
