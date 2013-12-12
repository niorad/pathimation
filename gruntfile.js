module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),   

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
      '/js/{,*/}*.js'
      ]
    },


    csslint: {

    },


    concat: {
      dist: {
        src: [
          'js/libs/jquery.min.js',
          'js/libs/jquery.easing.1.3.js',
          'js/main.js'
        ],
        dest: 'js/build/production.js'
      }
    },


    uglify: {
      build: {
        src: 'js/build/production.js',
        dest: 'js/build/production.min.js'
      }
    },


    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/build/'
        }]
      }
    },


    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/build/style.css': 'css/style.scss'
        }
      }
    },


    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '*.html',
          '/css/{,*/}*.css',
          '/js/{,*/}*.js',
          '/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },


    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            ''
          ]
        }
      }
    }


  });


  require('load-grunt-tasks')(grunt);

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'  
    ]);
  });


  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'imagemin', 'sass']);



};




