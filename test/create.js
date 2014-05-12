var fs = require('fs');
var grunt = require('grunt');
function Create (name){
    this.tmplPath = __dirname + '/tmpl';
    this.pagePath = __dirname + '/page';
    this.arrFile = null;
    this.name = name ? name.trim() : name;
    this._init();
}
Create.prototype = {
    constructor: Create,
    _init: function(){
        var self = this;
        var name = self.name;
        if(!name){
            console.log('新建页面名称没填');
            return;
        }
        var arrDir = fs.readdirSync(self.pagePath) || [];
        if(arrDir.indexOf(name) > -1){
            console.log('该页面已存在');
            return;
        }
        self.create();
    },
    create: function(){
        var self = this;
        var arrDir = self.getFiles(self.tmplPath);
        var name = this.name;
        arrDir.forEach(function(val){
            var path = self.tmplPath + '/' + val;
            var newPath = val.replace('tmpl',name);
            if(grunt.file.isDir(path)){
                if(val == 'lib'){
                    createLib(path);
                }
            }else{
                var content = grunt.file.read(path);
                var newContent = content.replace('{{tmpl}}',name);
                grunt.file.write(self.pagePath + '/'+ name + '/'+ newPath, newContent);
            }
        })
        function createLib(pathBase){
            var arr = self.getFiles(pathBase);
            arr.forEach(function(val){
                var path = pathBase + '/' + val;
                var newPath = val.replace('tmpl',name);
                if(grunt.file.isDir(path)){

                }else{
                    var content = grunt.file.read(path);
                    var newContent = content.replace('{{tmpl}}',name);
                    grunt.file.write(self.pagePath + '/'+ name + '/lib/'+ newPath, newContent);
                }
            })
        }
        console.log('创建成功');
    },
    getFiles: function(path){
        return fs.readdirSync(path);
    }
}

if(process.argv[2]){
    new Create(process.argv[2]);
}else{
    console.log('请输入创建的名称')
}