const { src, dest, watch, parallel } = require('gulp');
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

function versionWebp(done)
{
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') );
    done();
}

function versionAvif(done)
{
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') );
    done();
}

function minificarImagenes(done)
{
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe( cache(imagemin(opciones)) )
        .pipe( dest('build/img') );
    done();
}

function css(done)
{
    src('src/scss/**/*.scss')//Identificar el archivo de sass
        .pipe( plumber() )//Evitar que se detenga el proceso
        .pipe( sass() )//Compilar el archivo
        .pipe( dest('build/css') );//Almacenar el archivo compilado en la carpeta css
    done(); //Callback para finalizar tarea
}

function dev(done)
{
    watch('src/scss/**/*.scss', css);//Observar cambios en el archivo de sass
    done();
}

exports.css = css; //Exportar la funcion css como tarea por defecto
exports.minificarImagenes = minificarImagenes; //Exportar la funcion minificarImagenes como tarea por defecto
exports.versionWebp = versionWebp; //Exportar la funcion versionWebp como tarea por defecto
exports.versionAvif = versionAvif; //Exportar la funcion versionAvif como tarea por defecto
exports.dev = parallel( versionAvif, minificarImagenes, versionWebp, dev); //Exportar la funcion dev como tarea por defecto
