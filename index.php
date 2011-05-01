<?php require_once 'conf.php'; ?>
<!DOCTYPE html>
<html>
<head>
<title>Test</title>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<script>
var debugMode = <?php echo isset($_GET['debug']) ? 'true' : 'false'; ?>;
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/class/Conf.js"></script>
<script type="text/javascript" src="js/class/Text.js"></script>
<script type="text/javascript" src="js/class/Level.js"></script>
<script type="text/javascript" src="js/class/Char.js"></script>
<script type="text/javascript" src="js/class/Char/Hero.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</head>
<body>
<div id="game">
    <div id="level"></div>
    <div id="text">
        <div id="text-content"></div>
        <div id="text-confirm">&#9660;</div>
    </div>
</div>
<div id="hints">
Controls:<br /><br />
WASD: Move<br />
O: Skip text<br />
K: Run<br />
</div>
</body>
</html>
