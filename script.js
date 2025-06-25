const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');
const containerRect = container.getBoundingClientRect();

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Arrange cubes in initial grid
const gap = 10;
const size = 80;
cubes.forEach((cube, index) => {
  const cols = 2;
  const row = Math.floor(index / cols);
  const col = index % cols;
  cube.style.left = `${col * (size + gap)}px`;
  cube.style.top = `${row * (size + gap)}px`;
});

// Event handlers
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

function onMouseMove(e) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundaries
  x = Math.max(0, Math.min(x, container.clientWidth - size));
  y = Math.max(0, Math.min(y, container.clientHeight - size));

  activeCube.style.left = `${x}px`;
  activeCube.style.top = `${y}px`;
}

function onMouseUp() {
  activeCube = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}