const back = require('androidjs').back;
const urlExists = require("url-exists");

back.on("hello from front", function() {

	urlExists('http://167.205.43.1', function(err, exists) {
		if (exists) {
		  back.send("hello from back", "Hello from Android JS");
		} else {
		//   back.send('not valid');
		}
	});

});
