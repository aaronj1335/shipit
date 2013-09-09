var path = require('path');
var util = require('util');
var exec = require('shelljs').exec;
var rm = require('shelljs').rm;
var cp = require('shelljs').cp;
var cd = require('shelljs').cd;

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

  grunt.registerTask('deploy', 'deploy to gh-pages', function() {
    var dir = path.join(process.env.HOME, 'gh-pages');
    var ghTokenVarName = 'GH_TOKEN';
    var ghUser = 'aaronj1335';
    var ghRepo = 'shipit';
    var url = util.format('https://${%s}@github.com/%s/%s.git',
      ghTokenVarName, ghUser, ghRepo);
    var author = grunt.config().pkg.author;
    var name = author && author.name;

    if (!process.env.TRAVIS_PULL_REQUEST) {
      grunt.log.debug('deploying to gh-pages');

      rm('-rf', dir);

      exec('git clone --branch=gh-pages ' + url + ' ' + dir);

      cp('-rf', 'index.html', 'css', 'img', 'js', 'lib', 'plugin', dir);

      cd(dir);

      exec('git config user.email "travis@travis-ci.org"');

      if (name) {
        exec('git config user.name "' + name + ' via travis-ci"');
      }

      exec('git add .');

      var msg = 'travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages';
      if (exec('git commit -m "' + msg + '"').code === 0) {
        exec('git push -f origin gh-pages');
        grunt.log.ok('finished deploying');
      } else {
        grunt.log.ok('nothing new to deploy');
      }
    }
  });
};
