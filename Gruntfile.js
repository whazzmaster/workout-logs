/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    requirejs: {
      app: {
        options: {
          baseUrl: "./",
          appDir: "app/scripts",
          dir: "temp/js",
          modules: [
            { name: 'main' }
          ],

          optimize: "uglify2",
          preserveLicenseComments: false,
          generateSourceMaps: true,

          paths: {
            jquery: "../../bower_components/jquery/jquery",
            backbone: "../../bower_components/backbone/backbone",
            marionette: "../../bower_components/marionette/lib/backbone.marionette",
            underscore: "../../bower_components/lodash/dist/lodash.underscore",
            Handlebars: "../../bower_components/handlebars/handlebars",
            localStorage: "../../bower_components/backbone.localStorage/backbone.localStorage",
            hbs: "../../bower_components/require-handlebars-plugin/hbs",
            moment: "../../bower_components/moment/moment"
          },

          hbs: {
              helpers: true,            // default: true
              i18n: false,              // default: false
              templateExtension: 'hbs', // default: 'hbs'
              partialsUrl: '',           // default: ''
              helperPathCallback: function(name) {
                return 'helpers/' + name;
              }
          },

          shim: {
            jquery : {
              exports : 'jQuery'
            },
            underscore : {
              exports : '_'
            },
            backbone : {
              deps : ['jquery', 'underscore'],
              exports : 'Backbone'
            },
            localStorage: {
              deps: ['underscore']
            },
            marionette : {
              deps : ['jquery', 'underscore', 'backbone'],
              exports : 'Marionette'
            },
            Handlebars: {
              exports: 'Handlebars'
            }
          }
        }
      }
    },

    compass: {
      dist: {
        options: {
          config: 'compass.rb'
        }
      }
    },

    copy: {
      javascript: {
        files: [
          {src: ['bower_components/requirejs/require.js'], dest: 'dist/js/require.js', filter: 'isFile'},
          {src: ['temp/js/main.js'], dest: 'dist/js/main.js', filter: 'isFile'},
          {src: ['temp/js/main.js.map'], dest: 'dist/js/main.js.map', filter: 'isFile'}
        ]
      },
      html: {
        files: [{src: ['app/html/index.html'], dest: 'dist/index.html', filter: 'isFile'}]
      },
      tests: {
        files: [
          {src: ['bower_components/jquery/jquery.js'], dest: 'testing/js/lib/jquery.js', filter: 'isFile'},
          {src: ['bower_components/backbone/backbone.js'], dest: 'testing/js/lib/backbone.js', filter: 'isFile'},
          {src: ['bower_components/marionette/lib/backbone.marionette.js'], dest: 'testing/js/lib/marionette.js', filter: 'isFile'},
          {src: ['bower_components/lodash/dist/lodash.underscore.js'], dest: 'testing/js/lib/underscore.js', filter: 'isFile'},
          {src: ['bower_components/handlebars/handlebars.js'], dest: 'testing/js/lib/handlebars.js', filter: 'isFile'},
          {src: ['bower_components/backbone.localStorage/backbone.localStorage.js'], dest: 'testing/js/lib/localStorage.js', filter: 'isFile'},
          {src: ['bower_components/moment/moment.js'], dest: 'testing/js/lib/moment.js', filter: 'isFile'},
          {src: ['bower_components/require-handlebars-plugin/hbs'], dest: 'testing/js/lib/hbs.js', filter: 'isFile'},
          {src: ['bower_components/requirejs/require.js'], dest: 'testing/js/lib/require.js', filter: 'isFile'},
          {src: ['bower_components/qunit/qunit/qunit.js'], dest: 'testing/js/lib/qunit.js', filter: 'isFile'},
          {src: ['bower_components/qunit/qunit/qunit.css'], dest: 'testing/css/qunit.css', filter: 'isFile'},
          {src: ['app/html/tests.html'], dest: 'testing/index.html', filter: 'isFile'},
          {expand: true, cwd: 'app/tests', src: ['**/*.js'], dest: 'testing/js/test'},
          {expand: true, cwd: 'app/scripts', src: ['**/*.js', '!main.js'], dest: 'testing/js/src'}
        ]
      }
    },

    clean: {
      all: ['dist/index.html', 'dist/js/**', 'dist/css/**'],
      temp: ['temp/**'],
      tests: ['testing']
    },

    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      tests: {
        src: ['app/tests/**/*.js','!app/tests/lib/**']
      },
      app: {
        src: ['app/scripts/**/*.js']
      }
    },

    qunit: {
      all: {
        options: {
          timeout: 11000,
          urls: ['http://localhost:8001/index.html']
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      javascripts: {
        files: ['app/scripts/**/*.js', 'app/scripts/**/*.hbs'],
        tasks: ['jshint:app', 'requirejs', 'copy:javascript']
      },
      stylesheets: {
        files: ['app/stylesheets/**/*.scss'],
        tasks: ['compass']
      },
      html: {
        files: ['app/index.html'],
        tasks: ['copy:html']
      },
      tests: {
        files: ['app/tests/**','app/scripts/**/*.js', 'app/scripts/**/*.hbs', 'app/html/tests.html'],
        tasks: ['test']
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist'
        }
      },
      autotests: {
        options: {
          port: 8001,
          base: 'testing'
        }
      },
      tests: {
        options: {
          port: 8002,
          base: 'testing'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('default', ['clean', 'jshint:app', 'jshint:tests', 'copy:html', 'requirejs:app', 'copy:javascript', 'requirejs:tests', 'copy:tests', 'compass']);
  grunt.registerTask('test', ['jshint:tests', 'clean:tests', 'copy:tests', 'connect:autotests', 'qunit'])
};
