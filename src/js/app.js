document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    scrollNav();
    navegacionFija();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', () => {
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
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