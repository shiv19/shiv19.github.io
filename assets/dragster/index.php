
<!doctype html>
<html>
<head>
    <title>Dragster</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="jquery.ui.touch-punch.min.js"></script>
    <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
    <style type="text/css">

        body {
         font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
       }   

    	#draggable {
    		height: 50px;
    		width: 100px;
    		z-index: 1;
    		position: absolute;
    		top: 300px;
    		left: 200px;
    		background-image: url("choc.png");
    		background-repeat: none;
    		background-size: cover;
    	}

    	#target {
    		height: 200px;
    		width: 200px;
    		background-color: yellow;
    		z-index: 0;
    		margin: 0 auto;
    		margin-top: 200px;
    		border:2px solid black;

    	}

    	#target p{
    		text-align: center;
    		padding-top: 80px;
    		font-weight: bold;
    		color: white;
    	}

    	#target p span{
    		background-color: black;
    	}

    	#draggable p{
    		text-align: center;
    		padding-top: 10px;
    		font-weight: bold;
    		color: white;
    	}

    	.lead {
    		padding: 10px 0 0 10px;
    		margin: 0px;
    	}

    	.center {
    		text-align: center;
    	}


    </style>
</head>

<body>
<div class="container">
<div class="row">
<div class="col-md-4 col-md-offset-4">
<div><h1 class="center">Welcome to Dragster!</h1>
<div><h2 class="center">Drag the chocolate into the drop zone as quickly as possible!</h2></div>
	<div><p class="lead center">Your Reaction time was: <span id="time">None</span></div>
	<div><p class="lead center">Your Best time was: <span id="time2">None</span></div>
</div>
</div>
</div>
<div class="container">
<div class="row">
<div class="col-md-4 col-md-offset-4">
	<div id="draggable"></div>
	<div id="target"><p><span>Drop zone!</span></p></div>
</div>
</div>
</div>
	<script type="text/javascript" src="scripts.js"></script>
	<script src="js/bootstrap.min.js"></script>

	
</body>
</html>