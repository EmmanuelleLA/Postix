<?php
  // Data from client Insert
	$idPostit = NULL;
	if (isset($_GET['idPostit'])) 
		$idPostit = $_GET['idPostit'];
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
		<script type='text/javascript' src='./js/ajxUpdatePostit.js'></script>
		<script type='text/javascript' src='./js/ajxDeletePostit.js'></script>
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
				<h1> Modifier le post it </h1>
			</header>

			<section>
				<?php
					echo "<input class='idPostit' type='hidden' name='posX' value='" . $idPostit . "' />";
					// Open DB
					include_once("dbConfig.php");
					$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
					$mysqli->set_charset("utf8");
					// Query : select
					$query = "SELECT * FROM tblPostits WHERE id = $idPostit;";
					$result = $mysqli->query($query);
					// Query result
					$row = $result->fetch_assoc();
					echo "
					<input class='title'type='text' name='title' placeholder='Titre du postit' autofocus value=\"" .  $row['title'] . "\"/>
					<textarea class='content' name='content' placeholder='Contenu du postit' rows='5' cols='20'> " . $row['content'] . "</textarea>";
					echo "1<input id='sizeBar' type='range' min='1' max='3' value=\"" .  $row['size'] . "\"/>3";
					echo "<input class='borderColor' type='hidden' name='borderColor' value='" . $row['borderColor'] . "' />";
				?>
				<img class="borderImg selectedBorderImg" src="./medias/circle_blue.png"/><spam hidden>rgb(129, 193, 204)</spam>
				<img class="borderImg" src="./medias/circle_green.png"/><spam hidden>rgb(144, 204, 129)</spam>
				<img class="borderImg" src="./medias/circle_yellow.png"/><spam hidden>rgb(230, 209, 171)</spam>
				<img class="borderImg" src="./medias/circle_orange.png"/><spam hidden>rgb(250, 191, 82)</spam>
				<img class="borderImg" src="./medias/circle_red.png"/><spam hidden>rgb(216, 121, 121</spam>
				<input class='send' type='submit' value='Modifier' />
				<input class='sup' type='submit' value='Supprimer' />
				<input class='negate' type='submit' value='Annuler' />
			</section>
		</div>
	</body>
</html>
