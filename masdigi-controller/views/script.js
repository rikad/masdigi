// const { front } = require("androidjs");

const PORT = 8000;

setInterval(function() { 
	front.send("get ip");
}, 5000);

front.on("send ip", function(msg){
	console.log('ip : '+ msg);
});

front.on("go url", function(url){
	goURL(url);
});

function btnGO() {
	let ip = document.querySelector('#inputIP').value;
	let url = `http://${ip}:${PORT}?config=true`;
	console.log('cek ', url)

	front.send('check url', url);
}

function goURL(url) {
	window.location.href = url;
}
