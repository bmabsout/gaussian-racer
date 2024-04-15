#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform vec2 u_resolution;
uniform vec2 stds[360];
uniform vec2 u_mouse;
uniform vec2 means[360];
uniform int  n;
uniform sampler2D lower;

float normal_pdf(vec2 xy, vec2 mean, vec2 std) {
  vec2 a = (xy - mean) / std;
  return exp(-0.5 * dot(a, a)) / (std.x * std.y * 6.28318530718);
}

float all_the_normals(vec2 xy) {
  float sum = 0.0;
  for (int i = 0; i < 360; i++) {
    if (i >= n) {
      break;
    }
    sum += normal_pdf(xy, means[i], stds[i]);
  }
  //cap it at 1
  //sum = min(sum/1.0, 1.0);

  return sum;
}

void main() {

  // position of the pixel divided by resolution, to get normalized positions on the canvas
  vec2 st = uv*2.0-1.0; 

  // gl_FragColor = vec4(0.0,0.0, 0.0, all_the_normals(st));
  // gl_FragColor = vec4(stds[0], 0.0, 1.0);
  // gl_FragColor = vec4(vec3(all_the_normals(st)), 1.0)*texture2D(lower, uv);
  gl_FragColor = vec4(vec3(all_the_normals(st))*texture2D(lower, uv).xyz, 1.0);
  // gl_FragColor = texture2D(lower, uv);
}