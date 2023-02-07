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

canvas.onclick = (e) => {
	const point = getPointPos(canvas.width, canvas.height, e.offsetX, e.offsetY);
	drawPoint(point);
}

function drawPoint(pointPos) {
	const program = initWebGL(gl, vertexShader, fragmentShader);
	const a_position = gl.getAttribLocation(program, "a_position");
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);
	gl.vertexAttribPointer(
		a_position,
		2,
		gl.FLOAT,
		false,
		Float32Array.BYTES_PER_ELEMENT * 2,
		0
	);
	gl.enableVertexAttribArray(a_position);
	gl.useProgram(program);
	gl.drawArrays(gl.POINTS, 0, 1);

	setTimeout(() => {
		// 不在同一上下文，会覆盖之前绘制的
		const program2 = initWebGL(gl, vertexShader, fragmentShader);
		const a_position2 = gl.getAttribLocation(program2, "a_position");
		const pointPos2 = [0.5, 0.0];
		const positionBuffer2 = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos2), gl.STATIC_DRAW);
		gl.vertexAttribPointer(
			a_position2,
			2,
			gl.FLOAT,
			false,
			Float32Array.BYTES_PER_ELEMENT * 2,
			0
		);
		gl.enableVertexAttribArray(a_position1);
		gl.useProgram(program2);
		gl.drawArrays(gl.POINTS, 0, 1);
	}, 1000);
}

const program1 = initWebGL(gl, vertexShader, fragmentShader);
const a_position1 = gl.getAttribLocation(program1, "a_position");
const pointPos1 = [-0.5, 0.0];
const positionBuffer1 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos1), gl.STATIC_DRAW);
gl.vertexAttribPointer(
	a_position1,
	2,
	gl.FLOAT,
	false,
	Float32Array.BYTES_PER_ELEMENT * 2,
	0
);
gl.enableVertexAttribArray(a_position1);
gl.useProgram(program1);
gl.drawArrays(gl.POINTS, 0, 1);


const program2 = initWebGL(gl, vertexShader, fragmentShader);
const a_position2 = gl.getAttribLocation(program2, "a_position");
const pointPos2 = [0.5, 0.0];
const positionBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos2), gl.STATIC_DRAW);
gl.vertexAttribPointer(
	a_position2,
	2,
	gl.FLOAT,
	false,
	Float32Array.BYTES_PER_ELEMENT * 2,
	0
);
gl.enableVertexAttribArray(a_position1);
gl.useProgram(program2);
gl.drawArrays(gl.POINTS, 0, 1);