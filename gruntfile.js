module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),   

    jshint: {
      all: [
        'Gruntfile.js',
      '/js/{,*/}*.js'
      ]
    },

    concat: {

      dist: {
        src: [
          'js/libs/*.js',
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


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');


  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'  
    ]);
  });

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'imagemin', 'sass']);

};