// 绘制三角形（进阶）
import { initWebGL } from "./utils/common.js";

// 顶点着色器
const vertexShader = `
    attribute vec4 a_position;
    // 新增一个a_color的 attribute 变量
    attribute vec4 a_color;
    // 新增一个v_color的 varying 变量
    varying vec4 v_color;
    void main () {
        // gl_Position为内置变量，表示当前点的位置
        gl_Position = a_position;
        // gl_Position为内置变量，表示当前点的大小，为浮点类型，如果赋值是整数类型会报错
        gl_PointSize = 10.0;
        v_color = a_color;
    }  
`;
// 片元着色器
const fragmentShader = `
    // 设置浮点数精度
    precision mediump float;
    varying vec4 v_color;
    void main () {
        // vec4是表示四维向量，这里用来表示RGBA的值[0~1]，均为浮点数，如为整数则会报错
        // gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
        gl_FragColor = v_color;
    }
`;

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

// 设置清空颜色缓冲区时的颜色
gl.clearColor(1.0, 1.0, 0.0, 1.0);
// 清空颜色缓冲区
gl.clear(gl.COLOR_BUFFER_BIT);

const pointPos = [-0.5, 0.0, 0.5, 0.0, 0.0, 0.5];
const pointColor = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0];

// 初始化shader程序
const program = initWebGL(gl, vertexShader, fragmentShader);
// 告诉WebGL使用我们刚刚初始化的这个程序
gl.useProgram(program);

const a_position = gl.getAttribLocation(program, "a_position");
const a_color = gl.getAttribLocation(program, "a_color");

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointColor), gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(
  a_position,
  2,
  gl.FLOAT,
  false,
  Float32Array.BYTES_PER_ELEMENT * 2,
  0
);
// 这是将shader中的a_position与buffer绑定起来
// 注意：
// 在往WebGL传递数据中时，特别需要注意了。
// 在调用vertexAttribPointerAPI之前，一定要先bindBuffer，
// 这表示只有在当前的WebGLBuffer中是以这种方式读取数据。
gl.enableVertexAttribArray(a_position);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(
    a_color,
    4,
    gl.FLOAT,
    false,
    Float32Array.BYTES_PER_ELEMENT * 4,
    0
);
// 这是将shader中的a_color与colorBuffer绑定起来
gl.enableVertexAttribArray(a_color);

// 开始绘制，绘制类型是gl.POINTS绘制点，0表示第一个点的索引，3表示共绘制几个点
gl.drawArrays(gl.POINTS, 0, 3);

