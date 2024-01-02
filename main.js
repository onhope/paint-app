// DOM 초기화
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const colorBtn = document.querySelectorAll('.pallet button');
const eraserBtns = document.querySelector('#eraser');
const downloadBtn = document.querySelector('#download');

// 그리기 설정
let isDrawing = false;
let isErasing = false;

ctx.lineWidth = 5;
ctx.strokeStyle = "red";

// 이벤트 리스너
function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function drawing(e) {
  if(!isDrawing) return;
  if(isErasing) {
    // 지우개
    ctx.clearRect(e.offsetX, e.offsetY, 20, 20 )
  }
  else {
    // 그리기
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
}

function stopDrawing(e) {
  isDrawing = false;
  ctx.closePath();
}

function startErasing(e) {
  isErasing = true;
  colorBtn.forEach(button => button.classList.remove('selected'));
  eraserBtns.classList.add('selected');
}

function downloadCanvas() {
  const image = canvas.toDataURL("image/png", 1.0); //  PNG 이미지를 생성, 0-1 사이의 품질을 제공, 1은 고화질 
  const linkEl = document.createElement('a'); // a 태그 생성 
  linkEl.href = image; // a태그의 href 속성의 값은 대입
  linkEl.download = 'PaintApp'; // a태그에 download속성이 있으면 링크가 가르키는 파일을 다운로드 
  linkEl.click();
}

function changeColor(e) {
  isErasing = false;
  ctx.strokeStyle = e.currentTarget.dataset.color;

  // 내가 선택한 색상 활성화
  colorBtn.forEach(button => {
    if(button === e.currentTarget) {
      button.classList.add('selected');
    }
    else {
      button.classList.remove('selected');
    }
  });
  eraserBtns.classList.remove('selected');
}

// 이벤트 연결
canvas.addEventListener("mousedown", startDrawing);  
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);  
colorBtn.forEach(button => button.addEventListener("click", changeColor));
eraserBtns.addEventListener("click", startErasing);
downloadBtn.addEventListener("click", downloadCanvas);