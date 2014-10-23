var Connection = require('ssh2');
var sessionStore={};

exports.connect=function(req,res){
    var Connection = require('ssh2');
    var conn = new Connection();
    var session=sessionStore[req.session.id]={};
    session._streamBuffer="";
    conn.connect({
        host: req.body.ip,
        port: req.body.port,
        username: req.body.username,
        password: req.body.password
    });
    conn.on('ready', function() {
        conn.shell(function(err,stream){
            if (err != null) {
                console.log('error: ' + err);
            }

            stream.on('data', function(data) {
                session._streamBuffer+=data;
                console.log(""+data);
            }).on('close', function() {
                console.log('Stream :: close');
            });
            session._stream=stream;
        });
    });
    session._conn=conn;
    res.end();

}
exports.refresh=function(req,res){
    var session=sessionStore[req.session.id];
    var streamBuffer="";
    streamBuffer+=session._streamBuffer;
    console.log(streamBuffer);
    session._streamBuffer="";


    streamBuffer=streamBuffer.replace(/\r\n/g, "<br>").replace(/\r/g, "<br>").replace(/\n/g, "<br>").replace(/ /g,"&nbsp");
    res.end(streamBuffer);
}
exports.execute=function(req,res){
    var session=sessionStore[req.session.id];
    var command=req.body.line;
    var stream=session._stream;

    stream.write(command+"\n");
    res.end();
}