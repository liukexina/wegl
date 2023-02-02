// 绘制底图颜色

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");


// 设置清空颜色缓冲区时的颜色
gl.clearColor(1.0, 1.0, 0.0, 1.0);

// 清空颜色缓冲区
gl.clear(gl.COLOR_BUFFER_BIT);