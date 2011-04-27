$(function() {
    var chars = [];
    
    Char = function(className) {
        var self = this;
        
        this.DIR_UP = 0;
        this.DIR_RIGHT = 1;
        this.DIR_DOWN = 2;
        this.DIR_LEFT = 3;
        
        this.$char = $('<div class="char"></div>').appendTo($level);
        if (className) {
            this.$char.addClass(className);
        }
        
        this.id = chars.length;
        
        this.x = 0;
        this.y = 0;
        
        this.put = function(xpos, ypos) {
            this.x = xpos;
            this.y = ypos;
            this.$char
                .hide()
                .css({
                    left: this.x,
                    top: this.y
                })
                .show();
            
            return this;
        }
        
        this.move = function(xspeed, yspeed, bgPos) {
            var x = this.x,
                y = this.y,
                newX = this.x + xspeed,
                newY = this.y + yspeed;
            
            if (newX >= 0 && newX <= 640 - this.$char.width()) {
                x = newX;
            } 
            if (newY >= 0 && newY <= 480 - this.$char.height()) {
                y = newY;
            }
            
            $.each(chars, function(key, char) {
                if (self.id == key) return true;
                
                var sameWidth = newX < char.x + char.$char.width() && newX + self.$char.width() > char.x,
                    sameHeight = newY + self.$char.height() / 2 < char.y + char.$char.height() && newY + self.$char.height() > char.y;
                
                if (xspeed < 0 && newX < char.x + char.$char.width() && sameHeight) {
                    x -= xspeed;
                }
                    
                if (xspeed > 0 && newX + self.$char.width() > char.x && sameHeight) {
                    x -= xspeed;
                }
                
                if (yspeed < 0 && newY + self.$char.height() / 2 < char.y + char.$char.height() && sameWidth) {
                    y -= yspeed;
                }
                
                if (yspeed > 0 && newY + self.$char.height() > char.y && sameWidth) {
                    y -= yspeed;
                }
            });
            
            this.x = x;
            this.y = y;
            
            this.$char.css({
                backgroundPosition: bgPos,
                left: this.x,
                top: this.y
            });
            
            return this;
        }
        
        chars.push(this);
    };
});