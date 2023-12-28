const { src, dest, watch, parallel } = require('gulp');
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');


//Imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser-js');

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
        .pipe( sourcemaps.init() )//Iniciar el mapa de archivos
        .pipe( plumber() )//Evitar que se detenga el proceso
        .pipe( sass() )//Compilar el archivo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )//Aplicar postcss
        .pipe( sourcemaps.write('.') )//Escribir los archivos de mapa
        .pipe( dest('build/css') );//Almacenar el archivo compilado en la carpeta css
    done(); //Callback para finalizar tarea
}

function javascript(done)
{
    src('src/js/**/*.js')//Identificar el archivo de sass
        .pipe( sourcemaps.init() )//Iniciar el mapa de archivos
        .pipe( plumber() )//Evitar que se detenga el proceso
        .pipe( terser() )//Compilar el archivo
        .pipe( sourcemaps.write('.') )//Escribir los archivos de mapa
        .pipe( dest('build/js') );//Almacenar el archivo compilado en la carpeta css
    done(); //Callback para finalizar tarea
}

function dev(done)
{
    watch('src/scss/**/*.scss', css);//Observar cambios en los archivos de sass
    watch('src/js/**/*.js', javascript);//Observar cambios en los archivos de js
    done();
}

exports.js = javascript; //Exportar la funcion javascript como tarea por defecto
exports.css = css; //Exportar la funcion css como tarea por defecto
exports.minificarImagenes = minificarImagenes; //Exportar la funcion minificarImagenes como tarea por defecto
exports.versionWebp = versionWebp; //Exportar la funcion versionWebp como tarea por defecto
exports.versionAvif = versionAvif; //Exportar la funcion versionAvif como tarea por defecto
exports.dev = parallel( versionAvif, minificarImagenes, versionWebp, javascript, dev); //Exportar la funcion dev como tarea por defecto
