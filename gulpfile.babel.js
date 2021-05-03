// HTML
import htmlmin from 'gulp-htmlmin';


// Sass
import sass from 'gulp-sass';
// JavaScript
import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

// Common
import concat from 'gulp-concat';

// Configuración  para compilar  HTML
gulp.task('html-min', () => {
	return gulp
		.src('./src/*.html') // Carpetas que utilizamos
		.pipe(
			htmlmin({
				collapseWhitespace: true, // quita los espacios en blanco
				removeComments: true, // quita los comentarios
			}),
		)
		.pipe(gulp.dest('./public')); // Carpeta donde se Guarda todo
});


// Configuración Babel para compilar Js+
gulp.task('babel', () => {
	return gulp
		.src('./src/js/*.js') // Carpetas que utilizamos
		.pipe(concat('scripts-min.js')) //Une todos nuestros archivos js en uno solo
		.pipe(babel()) //Este el módulo que usará gulp para convertir el código a es5
		.pipe(terser()) // ofuscar el código
		.pipe(gulp.dest('./public/js')); // Carpeta donde se Guarda todo
});

//Configuración sass
gulp.task('sass', () => {
	return gulp
		.src('./src/scss/styles.scss') // Carpetas que utilizamos
		.pipe(
			sass({
				outputStyle: 'compressed',
			}),
		)
		.pipe(gulp.dest('./public/css')); // Carpeta donde se Guarda todo
});



gulp.task('default', () => {
	gulp.watch('./src/*.html', gulp.series('html-min'));
	gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./src/js/*.js', gulp.series('babel'));
});
