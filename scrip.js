const parametroURL= new URLSearchParams(Window.location.search)
const id_producto=parent(parametroURL)
const products = {

    '1': {
        image: 'https://via.placeholder.com/500x300/FF5733/FFFFFF?text=Producto+1',
        title: 'Gloss Dior',
        description: 'Descripción del Producto 1.',
        additionalInfo: 'Información adicional del Producto 1.'
    },
    '2': {
        image: 'https://via.placeholder.com/500x300/33C1FF/FFFFFF?text=Producto+2',
        title: 'Producto 2',
        description: 'Descripción del Producto 2.',
        additionalInfo: 'Información adicional del Producto 2.'
    },
    '3': {
        image: 'https://via.placeholder.com/500x300/FF33A1/FFFFFF?text=Producto+3',
        title: 'Producto 3',
        description: 'Descripción del Producto 3.',
        additionalInfo: 'Información adicional del Producto 3.'
    },
    '4': {
        image: 'https://via.placeholder.com/500x300/FF33A1/FFFFFF?text=Producto+3',
        title: 'Producto 3',
        description: 'Descripción del Producto 3.',
        additionalInfo: 'Información adicional del Producto 3.'
    },
    '5': {
        image: 'https://via.placeholder.com/500x300/FF33A1/FFFFFF?text=Producto+3',
        title: 'Producto 3',
        description: 'Descripción del Producto 3.',
        additionalInfo: 'Información adicional del Producto 3.'
    }
};

// Función para cambiar la información del producto
function changeProduct(productId) {
    // Obtener la información del producto seleccionado
    const product = products[productId];

    // Cambiar la imagen
    document.getElementById('product-image').src = product.image;

    // Cambiar el título
    document.getElementById('product-title').textContent = product.title;

    // Cambiar la descripción
    document.getElementById('product-description').textContent = product.description;

    // Cambiar la información adicional
    document.getElementById('additional-info').textContent = product.additionalInfo;
}