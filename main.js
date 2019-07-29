// se usa la libreria muuri
const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas'); //cargar las imagenes

	// Agregar los listener de los enlaces para filtrar por categoria.
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => { //funcion de tipo flecha  que itera los elementos de los enlaces
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault(); // prevenir el comportamiento por defecto que tiene el navegador
			enlaces.forEach((enlace) => enlace.classList.remove('activo')); //por cada enlace se accede a la lista de clases y eliminar activo
			evento.target.classList.add('activo');

			const categoria = evento.target.innerHTML.toLowerCase(); //acceder al enlace clickeado trae todo en minusculas
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`); //filtrar elementos con la libreria sobre las categorias ya sea en todos o en una categoria especifica
		});
	});

	// Agregar el listener para la barra de busqueda
  //  cuando escriba una letra, una variable guarde lo que se escriba
  // en la barra de buscar y saber si lo que se esta buscando corresponde
  // a una etiqueta
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
    //permitir mostrar todos los elementos si cumplen con la caracteristicas de las etiqueta y si las etiquetas
    // pertenecen a una categoria
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});

	// Agregar listener para las imagenes
  //cuando se presione en cualquiera de las imagenes se muestre else {
    // overlay de la imagen seleccionada
  }
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});

	// Eventlistener del boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	// Eventlistener del overlay
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});
