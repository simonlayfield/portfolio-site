module.exports = function(grunt) {
    var gifsicle = require('imagemin-gifsicle');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'public/assets/css/style.css': 'scss/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            html: {
                files: ['app/pages/*.html', 'app/includes/*.html'],
                tasks: ['includereplace']
            }
        },
        includereplace: {
            your_target: {
                options: {
                    // Task-specific options go here.
                },
                // Files to perform replacements and includes with
                src: 'app/pages/*.html',
                // Destination directory to copy files to
                dest: './',
                flatten: true,
                expand: true
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
                    cwd: 'public/assets/img/auto/gif/orig',
                    src: ['**/**/*.gif'],
                    dest: 'public/assets/img/auto/gif',
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
                    cwd: 'public/assets/img/auto/process/gif',
                    src: ['*.gif'],
                    dest: 'public/assets/img/auto/gif',
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
