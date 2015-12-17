module.exports = function(grunt) {
	grunt.initConfig({
		bookmarklet_wrapper: {
			default_options: {
				files: {
					'build/beanslide.min.js': ['src/beanslide.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-bookmarklet-wrapper');
	grunt.registerTask('default', ['bookmarklet_wrapper']);
};
