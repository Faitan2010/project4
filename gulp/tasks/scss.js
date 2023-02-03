import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import postcss from 'gulp-postcss';

const sass = gulpSass(dartSass);

export const scss = () => {
    console.log('app: ', `${app.path.rootFolder}/tailwind.config.js`);
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(postcss([
            tailwindcss(`./tailwind.config.cjs`),
            autoprefixer({
                    grid: 'autoplace',
                })
        ]))
        .pipe(app.plugins.if(app.isBuild, webpcss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        )))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
