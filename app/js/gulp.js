/**
 * Created by Administrator on 2016/8/6 0006.
 */
var gulp = require('gulp');

var connect = require('gulp-connect');

var htmlmin = require('gulp-htmlmin');

var cssmin = require('gulp-minify-css');

var cssver = require('gulp-make-css-url-version');

var uglify= require('gulp-uglify');

var imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush');

var notify = require('gulp-notify');

var jshint = require('gulp-jshint');



//html压缩
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('app/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'))
        .pipe(notify({ message: 'html task ok' }));
});


//css压缩
gulp.task('testCssmin', function () {
    gulp.src('app/css/*.css')
        .pipe(cssver())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'css task ok' }));
});


// 检查js
gulp.task('jshint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'js lint task ok' }));
});


//js 压缩
gulp.task('minifyjs', function() {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'js task ok' }));
});

// 压缩图片
gulp.task('imagemin', function() {
    return gulp.src('app/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/images/'))
        .pipe(notify({ message: 'img task ok' }));
});


// 执行默认任务
gulp.task('default', function() {
    gulp.start('testHtmlmin','testCssmin','jshint','minifyjs','imagemin');
});


