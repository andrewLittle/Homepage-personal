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
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'sass', 'watch']);

};