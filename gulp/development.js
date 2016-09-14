/**
 * @module development
 */

var gulp         = require( 'gulp' ),
    paths        = require( './lib/paths' ),
    helpers      = require( './lib/helpers' );

/**
 * ### Overview
 *
 * Tasks used for development purposes
 *
 * @namespace tasks
 */
var tasks = {

    /**
     * @task development
     * @namespace tasks
     */
    'development' : function( callback ) {

        /**
         * Will watch and execute tasks when files changed in these folders
         */
        gulp.watch( [ paths.forSource( 'server' ) + '/**/*.*' ], ["build-compile"] );
        gulp.watch( [ paths.forSource( 'scripts' ) + '/**/*.*' ], ["build-scripts"] );
        gulp.watch( [ paths.forSource( 'stylesheets' ) + '/**/*.scss' ], ["build-stylesheets"] );
        gulp.watch( [ 
            paths.forSource( 'templates' ) + '/**/*',
            paths.forSource( 'images' ) + '/**/*',
            paths.forSource( 'fonts' ) + '/**/*'
        ], ["build-assets"] );

    }

}

//
// Registering Tasks
//

helpers.importTasks( tasks );