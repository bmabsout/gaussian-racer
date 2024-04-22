#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform vec2 u_resolution;
uniform vec2 stds[362];
uniform vec2 u_mouse;
uniform vec2 means[362];
uniform int  n;

float normal_pdf(vec2 xy, vec2 mean, vec2 std) {
  vec2 a = (xy - mean) / std;
  return 0.5*exp(-0.5 * dot(a, a));
}

float all_the_normals(vec2 xy) {
  float sum = 0.0;
  for (int i = 0; i < 362; i++) {
    if (i >= n) {
      break;
    }
    sum += normal_pdf(xy, means[i], stds[i]);
  }
  //cap it at 1
  sum = min(sum, 0.7);

  return sum;
}

void main() {
  gl_FragColor = vec4(vec3(0.0, 0.0, 1.0), 1.0 - all_the_normals(uv*2.0-1.0));
}