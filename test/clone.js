var fs = require('fs');
var grunt = require('grunt');
function Clone (name,newName){
    this.name = name ? name.trim() : name;
    this.tmplPath = __dirname + '/page/' + this.name;
    this.pagePath = __dirname + '/page';
    this.newName = newName ? newName.trim() : newName;
    this._init();
}
Clone.prototype = {
    constructor: Clone,
    _init: function(){
        var self = this;
        var name = self.name;
        if(!self.newName){
            console.log('新建页面名称没填');
            return;
        }
        var arrDir = fs.readdirSync(self.pagePath) || [];
        if(arrDir.indexOf(name) < 0){
            console.log('复制的模板不存在');
            return;
        }
        self.clone();
    },
    clone: function(){
        var self = this;
        var arrDir = self.getFiles(self.tmplPath);
        arrDir.forEach(function(val){
            var path = self.tmplPath + '/' + val;
            var newPath = val.replace(self.name,self.newName);
            if(grunt.file.isDir(path)){
                if(val == 'lib'){
                    cloneLib(path);
                }
            }else{
                var content = grunt.file.read(path);
                var newContent = content.replace(self.name,self.newName);
                grunt.file.write(self.pagePath + '/'+ self.newName + '/'+ newPath, newContent);
            }
        })
        function cloneLib(pathBase){
            var arr = self.getFiles(pathBase);
            arr.forEach(function(val){
                var path = pathBase + '/' + val;
                var newPath = val.replace(self.name,self.newName);
                if(grunt.file.isDir(path)){

                }else{
                    var content = grunt.file.read(path);
                    var newContent = content.replace(self.name,self.newName);
                    grunt.file.write(self.pagePath + '/'+ self.newName + '/lib/'+ newPath, newContent);
                }
            })
        }
        console.log('创建成功');
    },
    getFiles: function(path){
        return fs.readdirSync(path);
    }
}
if(process.argv[2] && process.argv[3]){
    new Clone(process.argv[2],process.argv[3]);
}else{
    console.log('请输入复制模板的的名称与新建模板名称')
}