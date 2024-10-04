
// Selecciona todas las imagenes del slider
let slider = document.querySelectorAll('.slide');
let currentSlide=0;

// Funcion para cambiar de imagen
function changeSlide() {
    // Ocultar la imagen actual
    slider[currentSlide].classList.remove('active');

    // Cambiar al siguiente slide
    currentSlide=(currentSlide + 1) % slider.length;

    // Muestra la siguinte imagen
    slider[currentSlide].classList.add('active');
}

// Inicia al slider cambiar cada 3 segundos
setInterval(changeSlide, 2500);