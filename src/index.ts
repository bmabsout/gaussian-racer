import _ from 'lodash'
import * as p5Globals from 'p5/global'
import 'p5'
import { Graphics, Renderer, Shader } from 'p5'
import { Vector2, v2Rotate } from 'mz-math'
import { Gaussian, gaussiansToData } from './gaussians'
import './lines'
// import { Vector2 } from 'threejs-math'

let theShader: Shader
let alpher: Shader
let upper: Graphics
let lower: Graphics
let renderer: Renderer
const resDivider = 8

function preload() {
  // load the shader
  theShader = loadShader('shaders/basic.vert', 'shaders/basic.frag')
  alpher = loadShader('shaders/basic.vert', 'shaders/alpher.frag')
}


function mouseVec() : Vector2 {
  return [mouseX*2.0/width-1.0, mouseY*2.0/height-1.0]
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL)
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0)
  lower = createGraphics(width, height, WEBGL)
  upper = createGraphics(width/resDivider, height/resDivider, WEBGL)
  lower.colorMode(RGB, 1.0, 1.0, 1.0, 1.0)
  upper.colorMode(RGB, 1.0, 1.0, 1.0, 1.0)
}

function shadeUpper() {
  const gaussians : Gaussian[] = [
    {mean: [0.0,0.0], std: [.2, .2]},
    {mean: mouseVec(), std: [.2, .2]},
    ...(_.range(360, undefined, 15).map((i) => ({
      mean: v2Rotate(TWO_PI*i/360.0, [0.5,0]),
      std: [.2, .2] as Vector2
    })))
  ]
  upper.clear()

  let {means, stds} = gaussiansToData(gaussians)
  theShader.setUniform('u_resolution', [width, height])
  theShader.setUniform('u_mouse', mouseVec())

  theShader.setUniform('means', means as any)
  theShader.setUniform('stds', stds as any)
  theShader.setUniform('n', gaussians.length)
  upper.shader(theShader)
  upper.rect(-width/2.0, -height/2.0, width, height)
}

function shadeLower() {
  lower.clear()
  lower.background(1.0)
  lower.stroke(0)
  lower.line(0, 0, width, height)
  lower.fill("blue")
  lower.ellipse(width/2.0,height/2.0,height/2,height/2)
}

function draw() {
  clear()
  shadeUpper()
  shadeLower()
  alpher.setUniform('lower', lower)
  alpher.setUniform('upper', upper)
  shader(alpher)
  rect(-width/2.0, -height/2.0, width, height)
}

(window as any).windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  lower.resizeCanvas(windowWidth, windowHeight)
  upper.resizeCanvas(windowWidth/resDivider, windowHeight/resDivider)
}


(window as any).setup = setup; // for some reason semicolon is needed here
(window as any).draw = draw;
(window as any).preload = preload;

