// 禁用顶点颜色属性
import { initWebGL } from "./utils/common.js";

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

const vsGLSL = `
  attribute vec4 position;
  attribute vec4 color;

  uniform vec4 offset;

  varying vec4 v_color;

  void main() {
    gl_Position = position + offset;
    v_color = color;
  }
`;

const fsGLSL = `
  precision highp float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;


const prog = initWebGL(gl, vsGLSL, fsGLSL);
// 告诉WebGL使用我们刚刚初始化的这个程序
gl.useProgram(prog);

const positionLoc = gl.getAttribLocation(prog, 'position');
const colorLoc = gl.getAttribLocation(prog, 'color');
const offsetLoc = gl.getUniformLocation(prog, 'offset');

// vertex positions for triangle
const vertexPositions = new Float32Array([
   0.0,  0.4,
  -0.4, -0.4,
   0.4, -0.4,
]);

const vertexColors = new Float32Array([
  1, 1, 0, 1,  // yellow
  0, 1, 1, 1,  // cyan
  1, 0, 1, 1,  // magenta
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);

// this is not needed. It's just here to unclutter the diagram
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// above this line is initialization code
// --------------------------------------
// below is rendering code.

// --------------------------------------
// First draw a triangle with a different color for each vertex

// set the attributes
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(
    positionLoc, // location
    2,           // size (components per iteration)
    gl.FLOAT,    // type of to get from buffer
    false,       // normalize
    0,           // stride (bytes to advance each iteration)
    0,           // offset (bytes from start of buffer)
);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.enableVertexAttribArray(colorLoc);
gl.vertexAttribPointer(
    colorLoc, // location
    4,        // size (components per iteration)
    gl.FLOAT, // type of to get from buffer
    false,    // normalize
    0,        // stride (bytes to advance each iteration)
    0,        // offset (bytes from start of buffer)
);

// this is not needed. It's just here to unclutter the diagram
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// draw on left
gl.uniform4fv(offsetLoc, [-0.5, 0, 0, 0]);

// draw 3 vertices (1 triangle)
gl.drawArrays(gl.TRIANGLES, 0, 3);

// Now draw the triangle again in a solid color 
// by turning off the color attribute and setting
// an attribute values
gl.disableVertexAttribArray(colorLoc);
gl.vertexAttrib4fv(colorLoc, [0.3, 0.6, 0.9, 1]);

// draw on right
gl.uniform4fv(offsetLoc, [0.5, 0, 0, 0]);

// draw 3 vertices (1 triangle)
gl.drawArrays(gl.TRIANGLES, 0, 3);