$(function() {

Level = new function() {    
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
};

});