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
    
    function play(name, type) {
        if (!sounds[type][name]) self.load(name, type);
        
        if (disabled) return;
        
        if (sounds[type][name].currentTime) sounds[type][name].currentTime = 0;
        sounds[type][name].play();
    };
    
    this.playMusic = function(name) {
        play(name, 'music');
        
        $(sounds.music[name]).bind('ended', function() {
            this.currentTime = 0;
            this.play();
        });
    };
    
    this.playSound = function(name) {
        play(name, 'sound');
    };
    
    function stop(name, type) {
        if (sounds[type][name]) {
            sounds[type][name].pause();
            sounds[type][name].currentTime = 0;
        }
    };
    
    this.stopMusic = function(name) {
        stop(name, 'music');
        
        $(sounds.music[name]).unbind('ended');
    };
    
    this.stopSound = function(name) {
        stop(name, 'sound');
    };
};

});