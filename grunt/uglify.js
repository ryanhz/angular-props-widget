/* jshint camelcase:false */
'use strict';

module.exports = function (grunt) {

    grunt.config('uglify', {
        options: {
            banner: '// <%= pkg.name %> v<%= pkg.version %>\n'
        },
        app: {
            options: {
                mangle: true,
                beautify: false,
                sourceMap: false,
                compress: {
                    unused: false,
                    drop_console: true,
                    side_effects: false,
                    dead_code: true
                }
            },
            files: [{
                src: ['build/angular-props-widget-concat.js'],
                dest: 'dist/angular-props-widget.min.js'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
