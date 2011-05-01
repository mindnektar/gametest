$(function() {

Sound = new function() {
    var self = this;
    
    var sounds = {
        sound: {},
        music: {}
    };
    
    var volume = {
        music: 0.5,
        sound: 1.0
    };
    
    var $toggleSound = $('#togglesound input').click(function() {
        var elem = this;
        
        disabled = elem.checked;
        
        $.each(sounds, function(type, items) {
            $.each(items, function(_, sound) {
                sound.volume = disabled ? 0 : volume[type];
            });
        });
    });
    
    var disabled = $toggleSound.is(':checked');
    
    this.load = function(name, type) {
        sounds[type][name] = new Audio(type + '/' + name + '.ogg');
        sounds[type][name].volume = volume[type];
    };
    
    this.play = function(name, type) {
        if (disabled) return;
        
        if (!sounds[type][name]) this.load(name, type);
        
        var sound = sounds[type][name];
        
        if (type === 'music') {
            if (sound.currentTime === sound.duration) {
                sound.currentTime = 0;
            }
        }
        
        if (sound.currentTime) sound.currentTime = 0;
        sound.play();
    };
};

});