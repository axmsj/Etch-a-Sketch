let size = parseInt(prompt('What size do you want the row to be? (Selected 1 - 100)'));

while (size < 1 || size > 100) {
  size = parseInt(prompt('ENTER A NUMBER FROM 1 - 100!'));
}

let width = 960 / size + 'px';

const container = document.querySelector('#container');
//btn selection
const resetBtn = document.querySelector('#resetBtn');
const colorsBtn = document.querySelector('#colorsBtn');
const blackBtn = document.querySelector('#blackBtn');
const opacityBtn = document.querySelector('#opacityBtn');
const eraserBtn = document.querySelector('#eraserBtn');

//Creates grid
function createDivs(rowNum, colNum) {
  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < colNum; j++) {
      const allGridSquares = document.createElement('div');
      allGridSquares.setAttribute('class', 'gridSquare');
      allGridSquares.style.width = width;
      container.append(allGridSquares);
    }
  }
}

function makeRandColors() {
  const r = Math.floor(Math.random() * 255) + 1;
  const g = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 255) + 1;
  return `rgb(${r}, ${g}, ${b})`;
}

let currentMode = ''; // different mode for color - colors, black, opacity, eraser

colorsBtn.addEventListener('click', () => (currentMode = 'Colors'));
blackBtn.addEventListener('click', () => (currentMode = 'Black'));
opacityBtn.addEventListener('click', () => (currentMode = 'Opacity'));
eraserBtn.addEventListener('click', () => (currentMode = 'Eraser'));

container.addEventListener('mouseover', (e) => {
  let selected = e.target;
  if (!selected.classList.contains('gridSquare')) return;

  if (currentMode === 'Colors') {
    selected.style.opacity = 1;
    selected.style.backgroundColor = makeRandColors();
  }

  if (currentMode === 'Black') {
    selected.style.opacity = 1;
    selected.style.backgroundColor = 'Black';
  }

  if (currentMode === 'Opacity') {
    let opacity = Number(selected.style.opacity);
    if (opacity <= 1) {
      selected.style.backgroundColor = 'black';
      selected.style.opacity = opacity + 0.1;
    }
  }

  if (currentMode === 'Eraser') {
    selected.style.backgroundColor = 'white';
    selected.style.opacity = 0;
  }
});

resetBtn.addEventListener('click', (e) => {
  const gridSquare = document.querySelectorAll('.gridSquare');
  gridSquare.forEach((e) => (e.style.backgroundColor = 'white'));
  gridSquare.forEach((e) => (e.style.opacity = 0));
});

createDivs(size, size);
