/**
 * @module lib:helpers
 * @private
 */

var gulp = require( "gulp" );

module.exports = {

    /**
     * Import tasks provided as an object into gulp
     *
     * @param tasks {object}
     */
    importTasks : function( tasks ) {
        for ( var task in tasks ) {
            if ( tasks.hasOwnProperty( task ) ) {
                gulp.task( task, tasks[task] );
            }
        }
    },

    /**
     * Exports package.json
     */
    package : require( "../../package.json" )

};
