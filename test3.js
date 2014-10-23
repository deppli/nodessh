var Connection = require('ssh2');

var c = new Connection();
var s;
c.on('ready', function() {
   c.shell(onShell);
});

var onShell = function(err, stream) { 
    if (err != null) {
        console.log('error: ' + err);
    }
	s=stream;
    stream.on('data', function(data) {
	console.log("data:"+data);
    }).on('close',function(){
	
	});

    stream.write('cd log\r\n');
    stream.write('pwd\r\n');

    console.log('Shell');

}

c.connect({
    host: '10.112.13.156',
    port: 22, 
    username: 'node',
    password: 'node1234'
});
setTimeout(function(){
	s.write('ls\r\n');
},5000);
