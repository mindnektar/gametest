$(function() {

var texts = [
    'There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable.',
    'There is another theory which states that this has already happened.',
    'Now have fun walking around, doing nothing particularly exciting. Oh, and ignore the sucky sprite work, it\'s a placeholder.'
];

Text.writeBatch(texts, {className: 'nobox'}, function() {
    Level.load('tower', function() {
        UI.show();
        Hero.put(416, 344).setMoveAllowed(true);
        Number.put(0, 0);
    });
});

if (debugMode) {
    $wnd.keypress(function(e) {
        if (e.which === 32) main();
    });
}

function main() {
    Hero.handleInput();
    !debugMode && setTimeout(main, 20);
}

main();

});