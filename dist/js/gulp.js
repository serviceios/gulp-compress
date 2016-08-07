var gulp=require("gulp"),connect=require("gulp-connect"),htmlmin=require("gulp-htmlmin"),cssmin=require("gulp-minify-css"),cssver=require("gulp-make-css-url-version"),uglify=require("gulp-uglify"),imagemin=require("gulp-imagemin"),pngcrush=require("imagemin-pngcrush"),notify=require("gulp-notify"),jshint=require("gulp-jshint");gulp.task("testHtmlmin",function(){var e={removeComments:!0,collapseWhitespace:!0,collapseBooleanAttributes:!0,removeEmptyAttributes:!0,removeScriptTypeAttributes:!0,removeStyleLinkTypeAttributes:!0,minifyJS:!0,minifyCSS:!0};gulp.src("app/html/*.html").pipe(htmlmin(e)).pipe(gulp.dest("dist/html")).pipe(notify({message:"html task ok"}))}),gulp.task("testCssmin",function(){gulp.src("app/css/*.css").pipe(cssver()).pipe(cssmin()).pipe(gulp.dest("dist/css")).pipe(notify({message:"css task ok"}))}),gulp.task("jshint",function(){return gulp.src("app/js/*.js").pipe(jshint()).pipe(jshint.reporter("default")).pipe(notify({message:"js lint task ok"}))}),gulp.task("minifyjs",function(){return gulp.src("app/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js")).pipe(notify({message:"js task ok"}))}),gulp.task("imagemin",function(){return gulp.src("app/images/*").pipe(imagemin({progressive:!0,svgoPlugins:[{removeViewBox:!1}],use:[pngcrush()]})).pipe(gulp.dest("dist/images/")).pipe(notify({message:"img task ok"}))}),gulp.task("default",function(){gulp.start("testHtmlmin","testCssmin","jshint","minifyjs","imagemin")});