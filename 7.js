// 绘制图片
import { initWebGL } from "./utils/common.js";

// 顶点着色器
const vertexShader = `
    attribute vec4 a_position;
    // 把原来的颜色信息改为纹理坐标信息
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main () {
        gl_Position = a_position;
        // gl_PointSize = 10.0;
        v_texCoord = a_texCoord;
    }  
`;
// 片元着色器
const fragmentShader = `
    // 设置浮点数精度
    precision mediump float;
    varying vec2 v_texCoord;
    // 声明一个uniform变量来保存纹理
    uniform sampler2D u_texture;
    void main () {
      // 使用内建的texture2D函数进行采样，获取纹素颜色
      gl_FragColor = texture2D(u_texture, v_texCoord);
    }
`;

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

// 将顶点的位置数据修改为：
const pointPos = [
  -1, 1,
  -1, -1,
  1, -1,
  1, -1,
  1, 1,
  -1, 1,
];
// 给顶点增加对应的纹理坐标信息
const texCoordPos = [
  0, 1,
  0, 0,
  1, 0,
  1, 0,
  1, 1,
  0, 1
];

// 初始化shader程序
const program = initWebGL(gl, vertexShader, fragmentShader);
// 告诉WebGL使用我们刚刚初始化的这个程序
gl.useProgram(program);

const a_position = gl.getAttribLocation(program, "a_position");
const a_texCoord = gl.getAttribLocation(program, "a_texCoord");

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);
const texCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordPos), gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(
  a_position,
  2,
  gl.FLOAT,
  false,
  Float32Array.BYTES_PER_ELEMENT * 2,
  0
);
gl.enableVertexAttribArray(a_position);

gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.vertexAttribPointer(
    a_texCoord,
    2,
    gl.FLOAT,
    false,
    Float32Array.BYTES_PER_ELEMENT * 2,
    0
);
gl.enableVertexAttribArray(a_texCoord);

// 创建纹理
let texture = gl.createTexture();
// 绑定纹理
gl.bindTexture(gl.TEXTURE_2D, texture);
// 传递纹理数据
const image = new Image();
image.crossOrigin = 'anonymous';
image.src = 'https://obj.pipi.cn/starPlan/e9dc3de2aa925df543f6c953aba1c116.jpeg';

// 这告诉WebGL如果纹理需要被缩小时，采用线性插值的方式来进行采样
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
// 这告诉WebGL如果纹理需要被方法时，采用线性插值的方式来进行采样
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// 告诉WebGL如果纹理坐标超出了s坐标的最大/最小值，直接取边界值
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// 告诉WebGL如果纹理坐标超出了t坐标的最大/最小值，直接取边界值
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


// gl.viewport(0,0,100,100);

image.onload = function () {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}



const image1 = new Image();
image1.crossOrigin = 'anonymous';
image1.src = 'https://obj.pipi.cn/starPlan/5b9ee9e783142c49b4e7550e0c265fe7.png';
image1.onload = function () {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image1);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
