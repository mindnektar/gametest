$(function() {

Bubba = function() {
    Char.call(this, {className: 'monster-bubba', friendly: false});
    
    this.collWidth = 30;
    this.collHeight = 30;
    this.collX = parseInt(this.width / 2 - this.collWidth / 2);
    this.collY = this.height - this.collHeight;
};

});
