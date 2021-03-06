/**
 * Created by KelvinLin on 4/27/16.
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: {
                    except: ['$http', '$scope']
                }
            },
            build: {
                src: 'public/javascripts/<%= pkg.name %>.js',
                dest: 'public/javascripts/<%= pkg.name %>.min.js'
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};