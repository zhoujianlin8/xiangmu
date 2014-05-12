var express = require('express');
var app = express();
var fs = require('fs');

//------------------全局设置---------
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, err.stack.toString());
});
//------------------------------------


//assets----------------
app.use("/build", express.static(__dirname + '/build'));
//assets----------------


//html---------------------------
app.set('views', __dirname + '/page');
app.set('view engine', 'jade');
//html---------------------------


app.get('/:module', function (req, res) {
    var module = req.params.module;
    var path = app.get('views') + '/' + module + '/'+ module + ".json";
    var configpath = app.get('views') + '/common' + '/config' + ".json";
    var filename = app.get('views') + '/' + module + '/'+ module + '.jade';
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        data = JSON.parse(data);
        fs.readFile(configpath, 'utf8', function (err, configdata) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }

            var config = JSON.parse(configdata);
            for (var i in config) {
                data[i] = config[i];
            }
            data['basepath'] = data[req.query.env] + data["version"] + "/";
            res.render(filename, data);
        });

    });

});


var server = app.listen(81, function () {
    console.log(server.address().port)
});

