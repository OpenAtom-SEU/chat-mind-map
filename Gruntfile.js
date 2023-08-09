module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration
    concat: {
      options: {
        separator: ';',
      }, dist: {
        src: ['src/public/js/*.js'], dest: 'dist/<%= pkg.name %>.js',
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      }, dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
        },
      },
    },

    qunit: {
      files: ['test/**/*.html'],
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'], options: {
        globals: {
          jQuery: true, console: true, module: true,
        },
      },
    },

    watch: {
      files: ['<%= jshint.files %>'], tasks: ['jshint', 'qunit'],
    },

    browserSync: {
      bsFiles: {
        dist: 'dist/css/*.css', src: 'src/**',
      }, options: {
        server: {
          baseDir: './', index: './views/index.html', watchTask: true,
        },
      },
    },
  });

  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('dev', [
    //'concat', 'uglify', 'qunit', 'jshint', 'watch',
    'browserSync']);
};