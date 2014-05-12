//var info = require('./test.js');
//var create = require('./create.js')();
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean:  ['build/<%= pkg.version %>/*'],
        watch: {
            main: {
                files: ['page/**/*.less','page/*.less','page/**/*.js','page/*.js','page/**/lib/*.js'],
                tasks: [
                    'clean',
                    'less',
                    'kmc',
                    'copy',
                    'concat',
                    'uglify',
                    'cssmin'
                ],
                options: {
                    spawn: false
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files:  ['page/**/*.less','page/*.less','page/**/*.js','page/*.js','page/**/lib/*.js']
            }
        },

        less: {
            production: {
                options: {

                },
                files: [{
                    expand: true,
                    cwd: 'page',
                    src: ['**/*.less'],
                    dest: 'build/<%= pkg.version %>',
                    ext: '.css'
                }]
               // files: info.setLessFiles('<%= pkg.version %>')
            }
        },

        //js依赖打包
        kmc: {
            options: {
//                depFilePath: '../deps.js',
                comboOnly: false,
                fixModuleName: true,//补全模块名字
                comboMap: false
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'page',
                        //src: info.setKmcFiles(),
                        src: ['**/*.js'],
                        dest: 'build/<%= pkg.version %>'
                    }
                ]
            }
        },
        //js 合并
        concat: {
            combojs: {
                options: {
                    noncmd: true
                },
               // files: info.setConcatFiles('<%= pkg.version %>')
                files:[{
                    expand: true,
                    cwd: 'page',
                    src: ['**/*.js','**/lib/*.js'],
                    dest: 'build/<%= pkg.version %>'
                }]
            }
        },
        jade: {
            compile: {
                options: {
                    pretty:true,
                    data: {
                        debug: false
                       // assetsServer:pkg.assets
                    }
                },
                files:[
                    {
                        expand: true,
                        cwd: 'page',
                        src: ['**/*.jade'],
                        dest: 'build/<%= pkg.version %>',
                        ext: '.html'
                    }
                ]
            }
        },
        copy: {
           js:{
                files:[
                    {
                        expand: true,
                        cwd: 'page',
                        src: ['**/*.js'],
                        dest: 'build/<%= pkg.version %>'
                    }
                ]
            },
           css: {
                files: [
                    {
                        expand: true,
                        cwd: 'page',
                        src: ['**/*.css'],
                        dest: 'build/<%= pkg.version %>'
                    }
                ]
           }
        },


        //js 压缩
        uglify: {
            js: {
                options: {
                    beautify: {
                        ascii_only: true
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/<%= pkg.version %>',
                        src: ['**/*.js'],
                        dest: 'build/<%= pkg.version %>',
                        ext: "-min.js"
                    }
                ]
            }
        },
        //css 压缩
        cssmin: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/<%= pkg.version %>',
                        src: ['**/*.css'],
                        dest: 'build/<%= pkg.version %>',
                        ext: "-min.css"
                    }
                ]
            }
        }

    });

//默认执行
    grunt.registerTask('default', [
        'clean',
        'less',
        'kmc',
        'copy',
        'concat',
        'uglify',
        'cssmin',
        //'jade',
        'watch'
    ]);

};