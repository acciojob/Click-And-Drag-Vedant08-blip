const itemsContainer = document.getElementById('items');
let draggedItem = null;

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('dragstart', () => {
    draggedItem = item;
  });

  item.addEventListener('dragend', () => {
    draggedItem = null;
  });
});

itemsContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(itemsContainer, e.clientX);
  if (afterElement == null) {
    itemsContainer.appendChild(draggedItem);
  } else {
    itemsContainer.insertBefore(draggedItem, afterElement);
  }
});

function getDragAfterElement(container, x) {
  const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}