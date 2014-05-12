/**
 * Created by wb-zhoujl on 14-4-29.
 */
(function(){
    var S=KISSY,path=document.getElementById('init_script').src;
    path=path.split('/common')[0];
    KISSY.config({
        packages:[
            {
                combine:false,
                name:"page",
                path: path,
                charset:"utf-8",
                ignorePackageNameInUri:true  //包名不作为路径
            }
        ]
    });
})();

