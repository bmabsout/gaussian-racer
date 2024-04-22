#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform sampler2D lower;
uniform sampler2D upper;

void main() {
  vec4 lowerColor = texture2D(lower, uv);
  vec4 upperColor = texture2D(upper, uv);
  gl_FragColor = vec4(mix(upperColor.rgb, lowerColor.rgb, upperColor.a), 1.0);
}