module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    qunit: {
      all: {
        options: {
          urls: ['http://localhost:8000/test/index.html']
        }
      }
    },

    sass: {
      main: {
        files: {
          'css/theme/default.css': 'css/theme/source/default.scss',
          'css/theme/beige.css': 'css/theme/source/beige.scss',
          'css/theme/night.css': 'css/theme/source/night.scss',
          'css/theme/serif.css': 'css/theme/source/serif.scss',
          'css/theme/simple.css': 'css/theme/source/simple.scss',
          'css/theme/sky.css': 'css/theme/source/sky.scss',
          'css/theme/moon.css': 'css/theme/source/moon.scss',
          'css/theme/solarized.css': 'css/theme/source/solarized.scss'
        }
      }
    },

    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      files: ['Gruntfile.js', 'test/test.js']
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },

    watch: {
      main: {
        files: ['Gruntfile.js', 'js/reveal.js', 'css/reveal.css'],
        tasks: 'default'
      },
      theme: {
        files: ['css/theme/source/*.scss', 'css/theme/template/*.scss'],
        tasks: 'themes'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('themes', ['sass']);

  grunt.registerTask('dev', ['connect', 'watch']);

  grunt.registerTask('test', ['connect', 'qunit']);

};
