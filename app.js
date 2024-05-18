const ModeBtn = document.getElementById('mode-btn');
const destroyByn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
);
const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function conColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
  const colorValue = event.target.dataset.color;
  if (colorValue) {
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
  }
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    ModeBtn.innerText = 'Fill';
  } else {
    isFilling = true;
    ModeBtn.innerText = 'Draw';
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  ModeBtn.innerText = 'Fill';
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);

color.addEventListener('change', conColorChange);
colorOptions.forEach((color) =>
  color.addEventListener('click', conColorChange)
);

ModeBtn.addEventListener('click', onModeClick);
destroyByn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
