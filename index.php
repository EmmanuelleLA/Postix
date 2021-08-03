<?php	
	session_start();
	$_SESSION["lastRefreshPostit"] = "2000-01-01 00:00:00";
	$_SESSION["lastRefreshFile"] = "2000-01-01 00:00:00";
	$_SESSION["lastRefreshLink"] = "2000-01-01 00:00:00";
	$_SESSION["lastRefreshImage"] = "2000-01-01 00:00:00";
	$_SESSION["lastRefreshDrawing"] = "2000-01-01 00:00:00";
?>

<!DOCTYPE html>
<html>
	<!-- En tête -->
	<head>
		<!-- Fichiers CSS -->
		<link rel='stylesheet' type='text/css' href='./css/web.css' media='screen' />

		<!-- Fichiers Javascripts -->
		<script type='text/javascript' src='./js/jquery-2.0.3.min.js'></script>
		<script type='text/javascript' src='./js/jcanvas.min.js'></script>
		<script type='text/javascript' src='./js/ajxSelectPostit.js'></script>
		<script type='text/javascript' src='./js/ajxSelectFile.js'></script>
		<script type='text/javascript' src='./js/ajxSelectLink.js'></script>
		<script type='text/javascript' src='./js/ajxSelectImage.js'></script>
		<script type='text/javascript' src='./js/ajxSelectDrawing.js'></script>


		<!-- Encodage UTF8 pour les accents -->
		<meta charset='UTF-8'>

		<!-- Icône de l'onglet -->
		<link rel='icon' type='image/png' href='./images/favicon.png' />

		<!-- Titre de l'onglet -->
		<title>PostiX V8</title>
	</head>

	<!-- Corps du document -->
	<body>
		<!-- Wrapper -->
		<div class='wrapper'>
			<header>
				<h1> Postix </h1>
			</header>
			<canvas id="mainCanvas" width="1000" height="700"></canvas>
		</div>
	</body>
</html>
