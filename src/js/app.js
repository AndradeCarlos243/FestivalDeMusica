document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = 
        `<source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <source srcset="build/img/thumb/${i}.jpg" type="image/jpeg">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen ${i}">`;

        imagen.onclick = () => mostrarImagen(i);
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = 
    `<source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <source srcset="build/img/grande/${id}.jpg" type="image/jpeg">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen ${id}">`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

    overlay.onclick = () => {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    overlay.appendChild(cerrarImagen);
    cerrarImagen.onclick = () => {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    

}