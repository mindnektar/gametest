$(function() {

Level = new function() {
    this.width = 0;
    this.height = 0;
    
    this.x = 0;
    this.y = 0;
    
    this.coll = [];
    
    this.loadCallback = $.noop;
    
    this.getGrid = function() {
        var grid = [];
        for (var i = 0; i < 15; i++) {
            grid.push([]);
            for (var j = 0; j < 20; j++) {
                grid[i].push([]);
            }
        }
        
        return grid;
    }
    
    this.load = function(level, callback) {
        this.loadCallback = callback;
        $level.fadeOut(500, function() {
            $('<script type="text/javascript" src="js/level/' + level + '.js"></script>')
                .appendTo('head')
                .ready(function() {
                    $(this).remove();
                });
        });
    };
    
    this.prepare = function(params) {
        this.width = params.width;
        this.height = params.height;
        this.coll = params.coll;
        
        $level.css({
            background: 'url(img/level/' + params.bottomLayer + ') no-repeat 0 0',
            width: params.width,
            height: params.height
        });
        
        this.loadCallback();
        
        Sound.playMusic(params.music);
        
        $level.fadeIn(500);
    };
};

});