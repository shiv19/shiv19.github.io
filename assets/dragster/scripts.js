var droppedTime; var createdTime; var reactionTime; var bestTime = 2000;
var shapeSelect;

shapeSelect = Math.round(Math.random());
if(!shapeSelect){
	document.getElementById('target').style.borderRadius = "100px";
}
createdTime = Date.now();


$("#draggable").draggable();
$("#target").droppable({
	drop: function(ui, event) {
				droppedTime = Date.now();
				var time=Math.random();

				time *= 1000;

				$("#target").css("background-color","red");
				var top=200;var left=200;
				top+=Math.random() * 300;
				left+=Math.random() * 500;
				setTimeout(function(){
					document.getElementById("draggable").style.display="none";
					document.getElementById("draggable").style.top=top+'px';
					document.getElementById("draggable").style.left=left+'px';

					reactionTime = (droppedTime - createdTime)/1000;
					reactionTime = Math.abs(reactionTime);

					if (reactionTime < bestTime) {

						bestTime = reactionTime;

					}

					document.getElementById("time").innerHTML = reactionTime + "s";
					document.getElementById("time2").innerHTML = bestTime + "s";

				}, time);
				makeDraggable();

	}
});

function makeDraggable(){

	var time=Math.random();

	time *= 5000;

	setTimeout(function() {
		var shapeSelect;
		createdTime = Date.now();
		$("#draggable").draggable();
		$("#target").css("background-color","yellow");
		shapeSelect = Math.round(Math.random());
		if(!shapeSelect){
			document.getElementById('target').style.borderRadius = "100px";
		}else{
			document.getElementById('target').style.borderRadius = "0px";
		}
		document.getElementById("draggable").style.display="block";
		createdTime = Date.now();

	}, time);
}

