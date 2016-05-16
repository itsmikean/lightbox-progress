/*jslint node: true */
"use strict";

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          targetDir: './libs',
          cleanTargetDir: true
        }
      }
    },

    cssmin: {
      css: {
        src: 'public/css/exercise.css',
        dest: 'public/css/exercise.min.css'
      }
    },

    less: {
      compile: {
        files: {
          'public/css/exercise.css': 'public/less/exercise.less'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'public/dist/app.js': ['public/dist/app.js']
        },
        options: {
          mangle: false
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/js/*.js', 'public/components/**/*.js'],
        dest: 'public/dist/app.js'
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'public/app/*.js', 'public/components/lightbox/*.js']
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000
        }
      }
    },

    watch: {
      dev: {
        files: ['Gruntfile.js', 'public/js/*.js', 'public/*.html', 'public/components/**/*', 'public/less/exercise.less'],
        tasks: ['jshint', 'concat:dist', 'less:compile', 'cssmin:css'],
        options: {
          livereload: true
        }
      },
      min: {
        files: ['Gruntfile.js', 'public/js/*.js', 'public/*.html', 'public/components/**/*', 'public/less/exercise.less'],
        tasks: ['jshint', 'concat:dist', 'uglify:dist', 'less:compile', 'cssmin:css'],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('dev', ['bower', 'connect:server', 'watch:dev']);
  grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
};