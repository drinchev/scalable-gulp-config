/**
 * @module lib:paths
 * @private
 */

var config = require( "config" ),
    fs     = require( "fs" ),
    _      = require( "lodash" );

/**
 * Parse all paths and populate the directories with their roots if any.
 *
 * @private
 */
var normalizePaths = function( paths ) {

    var result  = {},
        recurse = function( cursor, adder, prop ) {

            if ( _.isString( cursor ) ) {
                if ( prop !== "root" ) {
                    result[prop] = adder + cursor;
                }
            } else if ( _.isArray( cursor ) ) {
                result[prop] = cursor.map( function( item ) {
                    return adder + item;
                } );
            } else {

                var isEmpty = true;

                if ( cursor["root"] ) {
                    adder += cursor["root"];
                    result[prop ? prop : "root"] = adder;
                }

                Object.keys( cursor ).forEach( function( key ) {
                    isEmpty = false;
                    recurse( cursor[key], adder, key );
                } );

                if ( isEmpty && prop ) {
                    result[prop] = {};
                }

            }

        };

    recurse( paths, "", "" );

    return result;

};

/**
 * Parse paths for all modules
 *
 * @private
 */
var paths  = config.get( 'paths' ),
    source = normalizePaths( paths['source'] ),
    build  = normalizePaths( paths['build'] );

/**
 * Export helpers
 */
module.exports = {

    /**
     * Exports all paths
     */
    for : paths,

    /**
     * Returns path for source
     *
     * @param [path] {string}
     * @returns {string}
     */
    forSource : function( path ) { return source[path ? path : "root"]; },

    /**
     * Returns path for build
     *
     * @param [path] {string}
     * @returns {string}
     */
    forBuild : function( path ) { return build[path ? path : "root"]; }

};