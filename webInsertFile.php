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
        <script type='text/javascript' src='./js/ajxCancel.js'></script>
        <script type='text/javascript' src='./js/ajxInsertFile.js'></script>

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
                <h1> Upload </h1>
            </header>

            <section>
                <label for="uploadFile" class="label-file">Choisir un fichier ...</label>
                <input id="uploadFile" class="input-file" type="file">
                
                <input class='title'type='text' name='title' placeholder='Titre du post it' autofocus />
                <img class="borderImg selectedBorderImg" src="./medias/circle_blue.png"/><spam hidden>Blue</spam>
				<img class="borderImg" src="./medias/circle_green.png"/><spam hidden>Green</spam>
				<img class="borderImg" src="./medias/circle_yellow.png"/><spam hidden>Yellow</spam>
				<img class="borderImg" src="./medias/circle_orange.png"/><spam hidden>Orange</spam>
				<img class="borderImg" src="./medias/circle_red.png"/><spam hidden>Red</spam>
                <button class="btnSend" id='uploadFile'>Envoyer</button>
                <input class='negate' type='submit' value='Annuler' />
                <?php
                    echo "<input class='posX' type='hidden' name='posX' value='$posX' />";
                    echo "<input class='posY' type='hidden' name='posY' value='$posY' />";
                ?>
            </section>
        </div>
    </body>
</html>