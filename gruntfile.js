module.exports = function(grunt) {
    var gifsicle = require('imagemin-gifsicle');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'assets/css/style.css': 'scss/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            html: {
                files: ['content/*.html', 'includes/*.html'],
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
                    src: ['assets/img/auto/gif'],
                    dest: 'assets/js/list-gif.json',
                    recurse: false
                }, {
                    src: ['assets/img/auto/photo'],
                    dest: 'assets/js/list-photo.json'
                }, {
                    src: ['assets/img/auto/inspire'],
                    dest: 'assets/js/list-inspire.json'
                }]
            }
        },
        imagemin: {
            gif: {
                options: {
                    interlaced: true,
                    optimizationLevel: 1,
                    use: [gifsicle()]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img/auto/gif/orig',
                    src: ['**/**/*.gif'],
                    dest: 'assets/img/auto/gif',
                    ext: '.gif'
                }]
            }
        },
        gif_video: {
            animated: {
                options: {
                    ffmpeg: {
                        webm: [
                            '-c:v libvpx',
                            '-pix_fmt yuv420p',
                            '-crf 10',
                            '-quality best',
                        ]
                    },
                    cleanup: true,
                    limit: 1
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img/auto/process/gif',
                    src: ['*.gif'],
                    dest: 'assets/img/auto/gif',
                }]
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-gif-video');
    grunt.loadNpmTasks('grunt-tree');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch', 'includereplace']);
}
