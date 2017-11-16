module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['gruntfile.js', 'js/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        ngtemplates: {
            app: {
                cwd: 'js/',      // Src matches are relative to this path.
                src: ['**/*.html', '!**/node_modules/**'], // Actual pattern(s) to match.
                dest: 'build/templates.js',
                options: {
                    module: 'app',
                    prefix: 'js/',
                    htmlmin:  {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'build/templates.min.js': ['build/templates.js'],
                    'js/<%= pkg.name %>.min.js': ['js/**/*.js']
                }
            }
        },

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            build: {
                // the files to concatenate
                src: ['build/<%= pkg.name %>.min.js', 'build/templates.min.js'],
                // the location of the resulting JS file
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'ngtemplates', 'uglify', 'concat']);

};