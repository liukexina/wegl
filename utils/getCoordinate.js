const convert = (l, r) => {
  return function (cordinate) {
      return 2 * cordinate / (r - l) - (r + l) / (r - l);
  }
}

function getPointPos(width, height, x,y) {
	const middleX = width / 2;
	const middleY = height / 2;
	const chaX = x - middleX;
	const chaY = -(y - middleY);
	const point = [chaX / middleX, chaY / middleY];
	return point;
}

function createProjectionMat(l, r, t, b, n, f) {
  return [
      2 / (r - l), 0, 0, 0,
      0, 2 / (t - b), 0, 0,
      0, 0, 2 / (f - n), 0,
      -(r + l) / (r - l), -(t + b) / (t - b), -(f + n) / (f - n), 1
  ]
}

function createTranslateMat(tx, ty) {
  return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, 0, 1
  ]
}

function createRotateMat(rotate) {
  rotate = rotate * Math.PI / 180;
  const cos = Math.cos(rotate);
  const sin = Math.sin(rotate);
  return [
      cos, sin, 0, 0,
      -sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
  ]
}

function createScaleMat(sx, sy) {
  return [
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
  ]
}

export {
  convert,
  getPointPos,
  createProjectionMat,
  createScaleMat,
  createRotateMat,
  createTranslateMat
}