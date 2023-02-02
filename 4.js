// 通过鼠标点击屏幕，鼠标每点击一次，在点击的位置绘制一个点。

import { initWebGL } from "./utils/common.js";
import { getPointPos } from "./utils/getCoordinate.js";

// 顶点着色器
const vertexShader = `
    attribute vec4 a_position;
    void main () {
        // gl_Position为内置变量，表示当前点的位置
        gl_Position = a_position;
        // gl_Position为内置变量，表示当前点的大小，为浮点类型，如果赋值是整数类型会报错
        gl_PointSize = 10.0;
    }  
`;
// 片元着色器
const fragmentShader = `
    // 设置浮点数精度
    precision mediump float;
    void main () {
        // vec4是表示四维向量，这里用来表示RGBA的值[0~1]，均为浮点数，如为整数则会报错
        gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
    }
`;

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

let pointPos = [
	-0.5, 0.0,
	0.5, 0.0,
	0.0, 0.5
];

// 初始化shader程序
const program = initWebGL(gl, vertexShader, fragmentShader);
// 告诉WebGL使用我们刚刚初始化的这个程序
gl.useProgram(program);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
drawPoint();

canvas.onclick = (e) => {
	const point = getPointPos(canvas.width, canvas.height, e.offsetX,e.offsetY);
	pointPos = [...pointPos, ...point];
	drawPoint();
}

function drawPoint() {
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);

	// 获取shader中a_position的地址
	const a_position = gl.getAttribLocation(program, "a_position");

	// 采用vertexAttribPointer进行传值
	gl.vertexAttribPointer(
		a_position,
		2,
		gl.FLOAT,
		false,
		Float32Array.BYTES_PER_ELEMENT * 2,
		0
	);

	gl.enableVertexAttribArray(a_position);

	// 开始绘制，绘制类型是gl.POINTS绘制点，0表示第一个点的索引，3表示共绘制几个点
	gl.drawArrays(gl.POINTS, 0, pointPos.length/2);
}