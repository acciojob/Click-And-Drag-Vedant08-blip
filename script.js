// Your code here.
const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Set initial positions in a grid layout
const gridCols = 4;
const gap = 10;
const cubeSize = 80;
cubes.forEach((cube, i) => {
  const col = i % gridCols;
  const row = Math.floor(i / gridCols);
  cube.style.left = `${col * (cubeSize + gap)}px`;
  cube.style.top = `${row * (cubeSize + gap)}px`;
});

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
});

function onMouseMove(e) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Clamp within container
  x = Math.max(0, Math.min(x, container.clientWidth - cubeSize));
  y = Math.max(0, Math.min(y, container.clientHeight - cubeSize));

  activeCube.style.left = `${x}px`;
  activeCube.style.top = `${y}px`;
}

function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  activeCube = null;
}
