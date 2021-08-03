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
		<link rel='stylesheet' type='text/css' href='./css/border.css' media='screen' />

		<!-- Fichiers Javascripts -->
		<script type='text/javascript' src='./js/jquery-2.0.3.min.js'></script>
		<script type='text/javascript' src='./js/ajxInsertPostit.js'></script>
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
					<input class='title' type='text' name='title' placeholder='Titre du postit' autofocus />
					<textarea class='content'name='content' placeholder='Contenu du postit' rows='5' cols='20'></textarea>
					1<input id='sizeBar' type='range' min='1' max='3' value='1' />3
					<img class="borderImg selectedBorderImg" src="./medias/circle_blue.png"/><spam hidden>rgb(129, 193, 204)</spam>
					<img class="borderImg" src="./medias/circle_green.png"/><spam hidden>rgb(144, 204, 129)</spam>
					<img class="borderImg" src="./medias/circle_yellow.png"/><spam hidden>rgb(230, 209, 171)</spam>
					<img class="borderImg" src="./medias/circle_orange.png"/><spam hidden>rgb(250, 191, 82)</spam>
					<img class="borderImg" src="./medias/circle_red.png"/><spam hidden>rgb(216, 121, 121</spam>

					<input class='btnSend' type='submit' value='Ajouter' />
					<input class='negate' type='submit' value='Annuler' />
					<?php
							echo "<input class='posX' type='hidden' name='posX' value='$posX' />";
							echo "<input class='posY' type='hidden' name='posY' value='$posY' />";
					?>
			</section>
		</div>
	</body>
</html>
