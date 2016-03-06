module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'dist/content/css/style.css': 'scss/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        includereplace: {
            your_target: {
                options: {
                    // Task-specific options go here.
                },
                // Files to perform replacements and includes with
                src: 'content/*.html',
                // Destination directory to copy files to
                dest: 'dist/'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('page-wrap-grunt-task');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.registerTask('default', ['watch', 'pagewrap']);
}
