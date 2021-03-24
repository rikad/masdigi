
var connect = setInterval(function(){ 
	front.send("hello from front");
}, 3000);


front.on("hello from back", function(msg) {	

	$('.container').html('<iframe src="https://167.205.43.1/config" style="width:100vw; heoght:100vh"></iframe>');

	clearInterval(connect);
});
