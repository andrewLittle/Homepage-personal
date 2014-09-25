module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['./css/*'],
        watch: {
            files: ['./scss/*.scss'],
            tasks: ['sass'],
            options: {
                spawn: false,
                interrupt: true,
            },
        },
        sass: {                              
            dist: {                            
                files: [{ 
                    expand: true,
                    cwd: 'scss',  
                    src: ['*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            options: {
                stripBanners: false
            },
            css: {
                src: 'css/*.css',
                dest: 'css/styles.css'
            }
        },
        cssmin: {
            global: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: 'styles.css',
                    dest: 'css',
                    ext: '.min.css',
                    extDot: 'last'
                }]
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: true
                }
            },
            dev: {
                files:{
                    'js/site.min.js': ['js/contact.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'sass', 'watch']);
    grunt.registerTask('deploy', ['clean', 'sass', 'concat', 'cssmin', 'uglify']);
};