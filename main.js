
const grid = new Muuri('.grid', {
  layout: {
   rounding: false
 }
});

window.addEventListener('Load', () => {
  grid.refreshItems().layout();
  document.getElementById('grid').classList.add('imagenes-cargadas');
});
