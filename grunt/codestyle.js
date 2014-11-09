'use strict';

module.exports = function (grunt) {

    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc'
        },
        src: ['gruntfile.js', 'grunt/**/*.js', 'src/**/*.js']
    });

    grunt.config('jscs', {
        options: {
            config: '.jscs.json'
        },
        src: ['gruntfile.js', 'grunt/**/*.js', 'src/**/*.js']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');
};
