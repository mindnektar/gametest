<?php require_once 'conf.php'; ?>
<!DOCTYPE html>
<html>
<head>
<title>Test</title>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="stylesheet" type="text/css" href="css/monster.css" />
<script>
var debugMode = <?php echo isset($_GET['debug']) ? 'true' : 'false'; ?>;
</script>
<script type="text/javascript" src="js/lib/jquery.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui.js"></script>
<script type="text/javascript" src="js/class/Conf.js"></script>
<script type="text/javascript" src="js/class/Text.js"></script>
<script type="text/javascript" src="js/class/Sound.js"></script>
<script type="text/javascript" src="js/class/Level.js"></script>
<script type="text/javascript" src="js/class/Char.js"></script>
<script type="text/javascript" src="js/class/Char/Hero.js"></script>
<script type="text/javascript" src="js/class/Char/Monster/Bubba.js"></script>
<script type="text/javascript" src="js/class/Char/Number.js"></script>
<script type="text/javascript" src="js/class/UI.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</head>
<body>
<div id="container">
    <div id="game">
        <div id="level"></div>
        <div id="text">
            <div id="text-content"></div>
            <div id="text-confirm">&#9660;</div>
        </div>
        <div id="ui">
            <div id="ui-hp-bar">
                <div></div>
            </div>
            <div id="ui-hp"><span id="ui-hp-cur"></span>/<span id="ui-hp-max"></span></div>
        </div>
    </div>
    <div id="togglesound">
        <label><input type="checkbox" /> Disable sound</label>
    </div>
    <div id="hints">
    Controls:<br /><br />
    WASD: Move<br />
    O: Skip text<br />
    K: Run<br />
    </div>
</div>
</body>
</html>
