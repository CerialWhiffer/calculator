import GulpClient from "gulp";
import GulpPostCss from "gulp-postcss";
import GulpSass from "gulp-sass";
import GulpSWC from "gulp-swc";
import GulpTerser from "gulp-terser";
import GulpESLint from "gulp-eslint-new";
import GulpPrettier from "gulp-prettier";
import GulpExtReplace from "gulp-ext-replace";

import * as dartSass from "sass";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import purgeCSSPlugin from "postcss-purgecss";

var sass=GulpSass(dartSass);
var plugins=[
    cssnanoPlugin({
        preset: "default"
    }),
    autoprefixer(),
    purgeCSSPlugin({
        fontFace: true,
        keyframes: true,
        rejected: true,
        stdout: true,
        content: ["./public/*.{html,htm,css,js,jsx}"]
    })
];

let srcFile=GulpClient.src("./src/**/*.{scss,css}", {
    base: "./src/"
});
let destFolder=GulpClient.dest("./public");
async function buildCSS(){
    try{
        srcFile.pipe(sass().on("error", sass.logError))
        .pipe(GulpPostCss(plugins))
        .pipe(destFolder);
        console.info("CSS build complete!");
    }catch(e){
        console.error("Gulp CSS build error encountered : ", e);
    }
}
GulpClient.task("build:css", buildCSS);
GulpClient.task("watch:css", ()=>{
    buildCSS();
    console.info("Watching for CSS file changes!");
    GulpClient.watch(["./src/**/*.{css,scss}", "./public/*.{html,htm}"], buildCSS);
});



var optionsSWC={
    jsc:{
        target: "es2022",
        parser: {
          syntax: "ecmascript",
          jsx: true
        },
        transform: {
          react: {
            pragma: "React.createElement",
            pragmaFrag: "React.Fragment",
            throwIfNamespace: true,
            development: false,
            useBuiltins: false
          }
        }
      }
};
var optionsESLint={
    fix: true,
    overrideConfig:{
        extends: "standard",
        rules:{
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off"
        }
    }
};
var optionsPrettier={
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 80
};

let srcFileJS=GulpClient.src("./src/**/*.{js,jsx}", {
    base: "./src/"
});
let destFolderJS=GulpClient.dest("./public");
async function buildJS(){
    try{
        srcFileJS
        .pipe(GulpESLint(optionsESLint))
        .pipe(GulpESLint.formatEach())
        .pipe(GulpPrettier(optionsPrettier))
        // Following lines havent been configured yet properly : [Throws syntax error on jsx code]

        .pipe(GulpSWC(optionsSWC).on("error", (e)=>{
            console.error("GulpSWC encountered an error : ", e.name);
            console.error("Error message - ", e.message);
        }))
        // .pipe(GulpTerser().on("error", (e)=>{
        //     console.error("GulpTerser encountered an error : ", e.name);
        //     console.error("Error message - ", e.message);
        // }))

        .pipe(GulpExtReplace(".js"))
        .pipe(destFolderJS);
        console.info("JS build complete!");
    }catch(e){
        console.error("Gulp JS build error encountered : ", e)
    }
}
GulpClient.task("build:js", buildJS);
GulpClient.task("watch:js", ()=>{
    buildJS();
    console.info("Watching for JS file changes!");
    GulpClient.watch("./src/*.{js,mjs,cjs,jsx}", buildJS);
});



GulpClient.task("build:all", async function(){
    GulpClient.parallel(buildCSS, buildJS)();
    console.info("Building source files complete!");
});
GulpClient.task("watch:all", async function(){
    console.info("Watching for all source file changes!");
    GulpClient.parallel(buildCSS, buildJS)();
    GulpClient.watch(["./src/**/*.{cjs,mjs,js,jsx}", "./src/*.{html,htm}", "./src/**/*.{css,scss}"], GulpClient.parallel(buildCSS, buildJS));
});