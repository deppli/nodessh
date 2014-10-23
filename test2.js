var Connection = require('ssh2');

var conn1 = new Connection(),
    conn2 = new Connection();

conn1.on('ready', function() {
  console.log('FIRST :: connection ready');
  conn1.exec('cd log', function(err, stream) {
    if (err) {
      console.log('FIRST :: exec error: ' + err);
      return conn1.end();
    }
    conn2.connect({
      sock: stream,
      username: 'node',
      password: 'node1234'
    });
  });
}).connect({
  host: '10.112.13.156',
  username: 'node',
  password: 'node1234'
});

conn2.on('ready', function() {
  console.log('SECOND :: connection ready');
  conn2.exec('pwd', function(err, stream) {
    if (err) {
      console.log('SECOND :: exec error: ' + err);
      return conn1.end();
    }
    stream.on('end', function() {
      conn1.end(); // close parent (and this) connection
    }).on('data', function(data) {
      console.log(data.toString());
    });
  });
});
