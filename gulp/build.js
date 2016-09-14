/**
 * @module build
 */

var gulp         = require( 'gulp' ),
    sequence     = require( 'gulp-sequence' ),
    gutil        = require( 'gulp-util' ),
    del          = require( 'del' ),
    es           = require( 'event-stream' ),
    sass         = require( 'gulp-sass' ),
    plumber      = require( 'gulp-plumber' ),
    ts           = require( 'gulp-typescript' ),
    paths        = require( './lib/paths' ),
    helpers      = require( './lib/helpers' );

/**
 * ### Overview
 *
 * Tasks used for building the NodeJS application
 *
 * @namespace tasks
 */
var tasks = {

    /**
     * @task build
     * @namespace tasks
     */
    'build' : function( callback ) {

        /**
         * It is a composite task that runs the following tasks in sequence
         *
         * 1. `build-clean`
         * 2. `build-compile`
         * 3. `build-scripts`
         * 4. `build-stylesheets`
         * 5. `build-assets`
         *
         * The different tasks are found below :
         *
         * @namespace tasks:build
         */
        sequence(
            'build-clean',
            'build-compile',
            'build-scripts',
            'build-stylesheets',
            'build-assets',
            callback );
    },

    /**
     * #### Cleans the build target folder
     *
     * Cleans the folder, which is the root of the compiled app ( `./.build` )
     *
     * @task build-clean
     * @namespace tasks
     */
    'build-clean' : function() {
        return del( [paths.forBuild() + '/**'] );
    },

    /**
     * #### Compiles the app
     *
     * Compiles the source application directory to the build directory
     *
     * @task build-compile
     * @namespace tasks
     */
    'build-compile' : function( cb ) {
        gulp.src( [paths.forSource( 'server' ) + '/**/*.*'] )
            .pipe( plumber() )
            .pipe( ts() )
            .pipe( gulp.dest( paths.forBuild( 'server' ) ) )
            .on( "error", error => cb( error ) )
            .on( "end", () => cb() );           
    },

    /**
     * #### Compiles front-end scripts
     *
     * Compiles all front-end scripts into bundles using ...
     *
     * @task build-scripts
     * @namespace tasks
     */
    'build-scripts' : function( cb ) {
        gulp.src( [paths.forSource( 'scripts' ) + '/**/*.*'] )
            .pipe( plumber() )
            .pipe( ts() )
            .pipe( gulp.dest( paths.forBuild( 'scripts' ) ) )
            .on( "error", error => cb( error ) )
            .on( "end", () => cb() );           
    },

    /**
     * #### Compiles stylesheets
     *
     * Compiles source stylesheets via [Sass](http://sass-lang.com/) with
     * SCSS syntax
     *
     * @task build-stylesheets
     * @namespace tasks
     */
    'build-stylesheets' : function() {
        return gulp.src( paths.forSource( 'stylesheets' ) + '/**/*.scss' )
            .pipe( sass().on( 'error', sass.logError ) )
            .pipe( gulp.dest( paths.forBuild( 'stylesheets' ) ) )
            .on( 'error', gutil.log );
    },

    /**
     * #### Copy assets
     *
     * Copies the static assets that will be used by the server :
     *
     * - templates
     * - images
     * - fonts
     *
     * @task build-assets
     * @namespace tasks
     */
    'build-assets' : function() {
        return es.merge(
            gulp.src( paths.forSource( 'templates' ) + '/**/*' )
                .pipe( gulp.dest( paths.forBuild( 'templates' ) ) ),
            gulp.src( paths.forSource( 'images' ) + '/**/*' )
                .pipe( gulp.dest( paths.forBuild( 'images' ) ) ),
            gulp.src( paths.forSource( 'fonts' ) + '/**/*' )
                .pipe( gulp.dest( paths.forBuild( 'fonts' ) ) )
        );
    }

};

//
// Registering Tasks
//

helpers.importTasks( tasks );