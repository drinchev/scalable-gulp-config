/**
 * @module package
 */

var gulp         = require( 'gulp' ),
    config       = require( "config" ),
	pack 		 = require( "@firma-de/gulp-package" ),
    paths        = require( './lib/paths' ),
    helpers      = require( './lib/helpers' );

/**
 * ### Overview
 *
 * Task used for packaging the project into a tar.gz file for deploying to the server
 *
 * @namespace tasks
 */
const tasks = {

    /**
     * #### Creates a package.tar.gz file in the `/.package` directory
     *
     * In this file we include :
     *
     *  - `/.build/*`
     *  - `/config/**`
     *  - `/package.json` ( added automatically by the script )
     *
     * @task package
     * @namespace tasks
     */
    "package" : function() {

        /**
         * Will copy the source files and create a package
         *
         * @namespace tasks:package
         */
        return gulp
            .src( [
                paths.forBuild() + "/**/*",
                "./config/**"
            ], { base : paths.forBuild() } )
            .pipe( pack( {
                revision : config.get( "package.revision" ),
                branch : config.get( "package.branch" )
            } ) )
            .pipe( gulp.dest( paths.forBuild( "package" ) ) )

    }

};

//
// Registering Tasks
//

helpers.importTasks( tasks );