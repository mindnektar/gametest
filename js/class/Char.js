$(function() {
    var chars = [];
    
    Char = function(opts) {
        var dflt = {
            friendly: true,
            texts: []
        };
        this.opts = $.extend(dflt, opts);
        
        this.$char = $('<div class="char"></div>').appendTo($level);
        if (this.opts.className) {
            this.$char.addClass(this.opts.className);
        }
        
        this.id = chars.length;
        
        this.x = 0;
        this.y = 0;
        
        this.collX = this.collX || 0;
        this.collY = this.collY || 0;
        this.collWidth = this.collWidth || this.$char.width();
        this.collHeight = this.collHeight || this.$char.height();
        
        this.xspeed = 0;
        this.yspeed = 0;
        
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
            this.xspeed = xspeed;
            this.yspeed = yspeed;
            
            var x = this.x,
                y = this.y,
                newX = this.x + this.xspeed,
                newY = this.y + this.yspeed;
            
            if (newX < 0 || newX > 640 - this.$char.width()) {
                this.xspeed = 0;
            } 
            if (newY < 0 || newY > 480 - this.$char.height()) {
                this.yspeed = 0;
            }
            
            if (this.xspeed || this.yspeed) {
                this.checkCollisions();
            }
            
            this.x += this.xspeed;
            this.y += this.yspeed;
            
            this.$char.css({
                backgroundPosition: bgPos,
                left: this.x,
                top: this.y
            });
            
            return this;
        };
        
        this.checkCollisions = function() {
            var self = this,
                newX = self.x + self.xspeed,
                newY = self.y + self.yspeed;
            
            $.each(chars, function(_, char) {
                if (self.id === char.id) return true;
                
                var insideRight = newX + self.collX < char.x + char.collX + char.collWidth,
                    insideLeft  = newX + self.collX + self.collWidth > char.x + char.collX,
                    insideDown  = newY + self.collY < char.y + char.collY + char.collHeight,
                    insideUp    = newY + self.collY + self.collHeight > char.y + char.collY,
                    nextToRight = self.x + self.collX < char.x + char.collX + char.collWidth,
                    nextToLeft  = self.x + self.collX + self.collWidth > char.x + char.collX,
                    nextToDown  = self.y + self.collY < char.y + char.collY + char.collHeight,
                    nextToUp    = self.y + self.collY + self.collHeight > char.y + char.collY;
                    
                if (insideRight && insideLeft && insideDown && insideUp) {
                    if (nextToRight && nextToLeft) self.yspeed = 0;
                    if (nextToDown && nextToUp) self.xspeed = 0;
                }
                
                if (self.id === 0 && char.opts.friendly) {
                    self.canTalkTo = (insideDown && insideUp && nextToLeft && nextToRight) || (insideLeft && insideRight && nextToUp && nextToDown) ? char : null;
                }
            });
        };
        
        chars.push(this);
    };
});