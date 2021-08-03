<?php
  // Data from client
	$posX = NULL;
	if (isset($_GET['posX'])) 
		$posX = $_GET['posX'];	
	$posY = NULL;
	if (isset($_GET['posY'])) 
		$posY = $_GET['posY'];
?>
<!DOCTYPE html>

<html>
	<!-- En tête -->
	<head>
		<!-- Fichiers CSS -->
		<link rel='stylesheet' type='text/css' href='./css/web.css' media='screen' />

		<!-- Fichiers Javascripts -->
		<script type='text/javascript' src='./js/jquery-2.0.3.min.js'></script>
		<script type='text/javascript' src='./js/webInsert.js'></script>
		<script type='text/javascript' src='./js/ajxCancel.js'></script>

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
				<h1> Nouveau post it </h1>
			</header>
			<section>
				<ul>
					<li class="btnPostit"> Postit <l/i>
					<li class="btnLink"> Link </li>
					<li class="btnFile"> File</li>
					<li class="btnImage"> Image</li>
					<li class="btnDrawing"> Drawing </li>
					<li class="btnUndelete"> Historique </li>
				</ul>
				<input class='negate' type='submit' value='Annuler' />

				<?php
					echo "<input class='posX' type='hidden' name='posX' value='$posX' />";
					echo "<input class='posY' type='hidden' name='posY' value='$posY' />";
				?>
			</section>
		</div>
	</body>
</html>
