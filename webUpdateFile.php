<?php
  // Data from client Insert
	$idFile = NULL;
	if (isset($_GET['idFile'])) 
		$idFile = $_GET['idFile'];
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
		<script type='text/javascript' src='./js/ajxUpdateFile.js'></script>
		<script type='text/javascript' src='./js/ajxDeleteFile.js'></script>
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
					echo "<input class='idFile' type='hidden' name='idFile' value='" . $idFile . "' />";
					// Open DB
					include_once("dbConfig.php");
					$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
					$mysqli->set_charset("utf8");
					// Query : select
					$query = "SELECT title, borderColor FROM tblFiles WHERE id = $idFile;";
					$result = $mysqli->query($query);
					// Query result
					$row = $result->fetch_assoc();
					echo "<input class='title'type='text' name='title' placeholder='Titre du ile' autofocus value=\"" .  $row['title'] . "\"/>";
					echo "<input class='borderColor' type='hidden' name='borderColor' value='" . $row['borderColor'] . "' />";
				?>

				<img class="borderImg" src="./medias/circle_blue.png"/><spam hidden>Blue</spam>
				<img class="borderImg" src="./medias/circle_green.png"/><spam hidden>Green</spam>
				<img class="borderImg" src="./medias/circle_yellow.png"/><spam hidden>Yellow</spam>
				<img class="borderImg" src="./medias/circle_orange.png"/><spam hidden>Orange</spam>
				<img class="borderImg" src="./medias/circle_red.png"/><spam hidden>Red</spam>

				<input class='send' type='submit' value='Modifier' />
				<input class='sup' type='submit' value='Supprimer' />
				<input class='negate' type='submit' value='Annuler' />
			</section>
		</div>
	</body>
</html>
