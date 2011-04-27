$(function() {

var texts = [
    'There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable.',
    'There is another theory which states that this has already happened.',
    'Now have fun walking around, doing nothing particularly exciting. Oh, and ignore the sucky sprite work, it\'s a placeholder.'
];

Text.writeBatch(texts, {}, function() {
    Hero.put(320, 240).setMoveAllowed(true);
    (new Char('random-npc')).put(160, 120);
});

function main() {
    Hero.prepareMovement();
    setTimeout(main, 20);
}

main();

});