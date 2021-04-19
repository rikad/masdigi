const back = require('androidjs').back;
const os = require('os');
const urlExists = require('url-exists');
const PORT_TV = 8000;

back.on("get ip", function(){
	let ip = checkIP();
	
	if(ip.length > 0) {
    back.send("send ip", JSON.stringify(ip));
    discovery(ip);
	}
});

back.on("check url", function(url){
  checkURL(url);
});

function discovery(ip) {
	ip.forEach(x => {
		let segment = x.split('.');
		segment.pop();
		segment = segment.join('.');
		for (let i = 1; i < 255; i++) {
			checkURL(`http://${segment}.${i}:${PORT_TV}?config=true`);
		}
	});
}

function checkURL(url) {
  console.log('cek', url);

  urlExists(url, function (err, exist) {
    if(exist) back.send('go url', url);
  })
}

function checkIP() {
  let ip = [];
  let networkInterfaces = os.networkInterfaces();

  Object.entries(networkInterfaces).forEach(function(v) {
    let ipv4 = v[1][0];

    if(!ipv4.internal) {
       ip.push(ipv4.address);
    }

  });

  return ip;
}
