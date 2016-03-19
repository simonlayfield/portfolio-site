module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            html: {
              files: 'content/*.html',
              tasks: ['includereplace']
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
                dest: './',
                flatten: true,
                expand: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch', 'includereplace']);
}
