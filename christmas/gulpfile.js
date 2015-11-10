var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//config file
var dest  = './release/';
var index = "index.html";
var config = {
    dest: dest,
    webServer: {
        server    : './release',
        index     : index,
        port      : 3000,
        logLevel  : "debug",
        logPrefix : "Aaron",
        open      : true,
        files     : [dest + "/js/*.js",dest + "/css/*.css", "./index.html"] //监控变化
    },
    release: {
        index : dest + index, //主页
        js    : dest + '/**/*.css'
    }
}



// web服务 Server + watching scss/html files
gulp.task('web-server', function() {
    browserSync.init(config.webServer);
});


gulp.task('watch', ['web-server'], function() {
    gulp.watch(config.script.watch, ['scripts']);
    gulp.watch(config.css.src, ['scripts']);
    gulp.watch(config.release.index).on('change', reload);
    gulp.watch(config.release.js).on('change', reload);
})

gulp.task('default', ['watch'])



