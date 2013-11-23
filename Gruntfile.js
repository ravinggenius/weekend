'use strict';

var LIVERELOAD_PORT = 45728;
var lrSnippet = require('connect-livereload')({
	port: LIVERELOAD_PORT
});

var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		watch: {
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'.tmp/styles/**/*',
					'app/**/*',
					'!app/styles/**/*'
				]
			},
			styles: {
				options: {
					livereload: false
				},
				files: 'app/styles/**/*.sass',
				tasks: [ 'sass' ]
			}
		},

		connect: {
			options: {
				livereload: LIVERELOAD_PORT,
				port: 5000
			},
			dev: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'app')
						];
					}
				}
			}
		},

		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},

		clean: {
			dist: [ 'build/*' ],
			temp: [ '.tmp/*' ]
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'app/scripts/**/*.js'
			]
		},

		sass: {
			temp: {
				options: {
					loadPath: [
						'app/components'
					]
				},
				files: {
					'.tmp/styles/application.css': 'app/styles/application.sass'
				}
			}
		},

		useminPrepare: {
			options: {
				dest: 'build',
				staging: '.tmp'
			},
			html: 'app/index.html'
		},

		cssmin: {
			dist: {
				files: {
					'build/styles/application.css': [
						'.tmp/styles/application.css'
					]
				}
			}
		},

		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'app',
						dest: 'build',
						src: [
							'index.html',
							'images/**',
							'fonts/**'
						]
					}
				]
			}
		},

		rev: {
			dist: {
				files: {
					// src: 'build/{fonts,images,scripts,styles}/**/*'
					src: 'build/{images,scripts,styles}/**/*'
				}
			}
		},

		usemin: {
			html: 'build/**/*.html'
		}
	});

	grunt.registerTask('build', [
		'jshint',

		'clean:dist',
		'clean:temp',

		'useminPrepare',

		'sass',
		'cssmin',

		'concat',
		'uglify',

		'copy',
		'rev',

		'usemin'
	]);

	grunt.registerTask('server', [
		'clean:temp',
		'sass',

		'connect',
		'open',

		'watch'
	]);
};
