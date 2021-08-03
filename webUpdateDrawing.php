<?php
  // Data from client Insert
	$idDrawing = NULL;
	if (isset($_GET['idDrawing'])) 
		$idDrawing = $_GET['idDrawing'];
?>

<!DOCTYPE html>

<html>
	<!-- En tête -->
	<head>
		<!-- Fichiers CSS -->
		<link rel='stylesheet' type='text/css' href='./css/web.css' media='screen' />
		<link rel='stylesheet' type='text/css' href='./css/drawing.css' media='screen' />
		<link rel='stylesheet' type='text/css' href='./css/border.css' media='screen' />

		<!-- Fichiers Javascripts -->
		<script type='text/javascript' src='./js/jquery-2.0.3.min.js'></script>
		<script type='text/javascript' src='./js/jcanvas.min.js'></script>
		<script type='text/javascript' src='./js/ajxUpdateDrawing.js'></script>
		<script type='text/javascript' src='./js/ajxDeleteDrawing.js'></script>
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
			<!-- <header>
				<h1> Modifier le post it </h1>
			</header> -->
			<section>
				<canvas id="drawingCanvas" width="1000" height="700"></canvas>
			</section>
			<section class="icone">
				<article class="width">
					<img class="widthImg widthImg1 selectedImg" src="./medias/trait1.png"/><spam hidden>1</spam>
					<img class="widthImg widthImg2" src="./medias/trait2.png"/><spam hidden>2</spam>
					<img class="widthImg widthImg3" src="./medias/trait3.png"/><spam hidden>3</spam>
				</article>

				<article class="color">
					<img class="colorImg colorImgBlue selectedImg" src="./medias/circle_blue.png"/><spam hidden>Blue</spam>
					<img class="colorImg colorImgGreen" src="./medias/circle_green.png"/><spam hidden>Green</spam>
					<img class="colorImg colorImgYellow" src="./medias/circle_yellow.png"/><spam hidden>Yellow</spam>
					<img class="colorImg colorImgOrange" src="./medias/circle_orange.png"/><spam hidden>Orange</spam>
					<img class="colorImg colorImgRed" src="./medias/circle_red.png"/><spam hidden>Red</spam>
				</article>

				<article class="delete">
					<img class="deleteImg" src="./medias/ereaser2.png"/>
				</article>

				<article class="delay">
					<img class="delayImg delayImg1 selectedImg" src="./medias/delay0.png"/><spam hidden>1</spam>
				</article>
			</section> 
			<div class='bar'></div>
			<section>
				<?php
					echo "<input class='idDrawing' type='hidden' name='idDrawing' value='" . $idDrawing . "' />";
					// Open DB
					include_once("dbConfig.php");
					$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
					$mysqli->set_charset("utf8");
					// Query : select
					$query = "SELECT title, size, borderColor FROM tblDrawings WHERE id = $idDrawing;";
					$result = $mysqli->query($query);
					// Query result
					$row = $result->fetch_assoc();
					echo "<input class='title'type='text' name='title' placeholder='Titre du dessin' autofocus value=\"" .  $row['title'] . "\"/>";
					echo "1<input id='sizeBar' type='range' min='1' max='3' value=\"" .  $row['size'] . "\"/>3";
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
