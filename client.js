var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();

var connected = false;

connect();

function reconnect(){

	if(!connected){
		console.log('Trying to reconnect...');
		connect();
	}

}

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

function connect(){
	client.connect(PORT, HOST, function(){

		console.log('CONNECTED TO: '+HOST+':'+PORT);
		connected = true;

	});
}

client.on('error', function(data){

		//console.log('Error: '+data);
		sleep(3000,reconnect);

});
client.on('data', function(data){

	console.log('DATA: '+data);

});
client.on('close', function(){

	console.log('Connection closed.');
	connected = false;
	sleep(3000,reconnect);
 
});

