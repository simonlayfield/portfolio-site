module.exports = function(grunt) {
    var gifsicle = require('imagemin-gifsicle');
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
        },
        tree: {
            default: {
                options: {
                    perttify: true
                },
                files: [{
                    src: ['img/auto/gif'],
                    dest: 'js/list-gif.json'
                }, {
                    src: ['img/auto/photo'],
                    dest: 'js/list-photo.json'
                }, {
                    src: ['img/auto/inspire'],
                    dest: 'js/list-inspire.json'
                }]
            }
        },
        imagemin: {
            gif: {
                options: {
                    interlaced: true,
                    use: [gifsicle()]
                },
                files: [{
                    expand: true,
                    cwd: 'img/auto/gif/orig',
                    src: ['**/*.gif'],
                    dest: 'img/auto/gif',
                    ext: '.gif'
                }]
            }
        }


    });
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-tree');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch', 'includereplace']);
}
