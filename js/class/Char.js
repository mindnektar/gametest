$(function() {
    var chars = [];
    
    Char = function(opts) {
        var self = this;
        
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
        this.width = this.$char.width();
        this.height = this.$char.height();
        
        this.collX = this.collX || 0;
        this.collY = this.collY || 0;
        this.collWidth = this.collWidth || this.width;
        this.collHeight = this.collHeight || this.height;
        
        this.xspeed = 0;
        this.yspeed = 0;
        
        this.put = function(xpos, ypos) {
            this.xInLevel = xpos;
            this.yInLevel = ypos;
            
            if (this.id === 0) {
                Level.x = xpos - 320 >= 0 ? xpos - 320 : 0;
                Level.y = ypos - 240 >= 0 ? ypos - 240 : 0;
                $level.css({backgroundPosition: (-Level.x) + 'px ' + (-Level.y) + 'px'});
            }
            
            this.x = xpos - Level.x;
            this.y = ypos - Level.y;
            
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
            
            var newX = this.xInLevel + this.xspeed,
                newY = this.yInLevel + this.yspeed;
            
            if (newX < 0 || newX > Level.width - this.$char.width()) {
                this.xspeed = 0;
            } 
            if (newY < 0 || newY > Level.height - this.$char.height()) {
                this.yspeed = 0;
            }
            
            this.xInLevel += this.xspeed;
            this.yInLevel += this.yspeed;
            
            var charCss = {backgroundPosition: bgPos},
                bgPos = $level.css('background-position').split(' '),
                bgPosChanges = false;
            
            if (
                this.id === 0 &&
                (
                    (this.xspeed < 0 && this.nearLeftBorder()) ||
                    (this.xspeed > 0 && this.nearRightBorder())
                )
            ) {
                if (Level.x + xspeed < 0) this.xspeed = -Level.x;
                if (Level.x + 640 + xspeed > Level.width) this.xspeed = Level.width - 640 - Level.x; 
                Level.x += this.xspeed;
                bgPos[0] = (parseInt(bgPos[0]) - this.xspeed) + 'px';
                bgPosChanges = true;
            } else {
                this.x += this.xspeed;
                charCss.left = this.x;
            }
            
            if (
                this.id === 0 &&
                (
                    (this.yspeed < 0 && this.nearTopBorder()) ||
                    (this.yspeed > 0 && this.nearBottomBorder())
                )
            ) {
                if (Level.y + yspeed < 0) this.yspeed = -Level.y;
                if (Level.y + 480 + yspeed > Level.height) this.yspeed = Level.height - 480 - Level.y; 
                Level.y += this.yspeed;
                bgPos[1] = (parseInt(bgPos[1]) - this.yspeed) + 'px';
                bgPosChanges = true;
            } else {
                this.y += this.yspeed;
                charCss.top = this.y;
            }
            
            if (this.xspeed || this.yspeed) {
                this.checkCollisions();
            }

            if (bgPosChanges) {
                $wnd.trigger('correctPosition', [this.xspeed, this.yspeed]);
                $level.css({backgroundPosition: bgPos.join(' ')});
            }
            
            this.$char.css(charCss);
            
            return this;
        };
        
        this.checkCollisions = function() {
            var newX = self.xInLevel + self.xspeed,
                newY = self.yInLevel + self.yspeed;
            
            $.each(chars, function(_, char) {
                if (self.id === char.id) return true;
                
                var insideRight = newX + self.collX < char.xInLevel + char.collX + char.collWidth,
                    insideLeft  = newX + self.collX + self.collWidth > char.xInLevel + char.collX,
                    insideDown  = newY + self.collY < char.yInLevel + char.collY + char.collHeight,
                    insideUp    = newY + self.collY + self.collHeight > char.yInLevel + char.collY,
                    nextToRight = self.xInLevel + self.collX < char.xInLevel + char.collX + char.collWidth,
                    nextToLeft  = self.xInLevel + self.collX + self.collWidth > char.xInLevel + char.collX,
                    nextToDown  = self.yInLevel + self.collY < char.yInLevel + char.collY + char.collHeight,
                    nextToUp    = self.yInLevel + self.collY + self.collHeight > char.yInLevel + char.collY;
                    
                if (insideRight && insideLeft && insideDown && insideUp) {
                    if (nextToRight && nextToLeft) self.yspeed = 0;
                    if (nextToDown && nextToUp) self.xspeed = 0;
                }
                
                if (self.id === 0 && char.opts.friendly) {
                    self.canTalkTo = (insideDown && insideUp && nextToLeft && nextToRight) || (insideLeft && insideRight && nextToUp && nextToDown) ? char : null;
                }
            });
        };
        
        this.nearLeftBorder = function() {
            return this.x <= 240 && Level.x > 0;
        };
        
        this.nearRightBorder = function() {
            return this.x >= 400 + this.width && Level.x < Level.width - 640;
        };
        
        this.nearTopBorder = function() {
            return this.y <= 180 && Level.y > 0;
        };
        
        this.nearBottomBorder = function() {
            return this.y >= 300 + this.height && Level.y < Level.height - 480;
        };
        
        this.id !== 0 && $wnd.bind('correctPosition', function(e, xspeed, yspeed) {
            self.x -= xspeed;
            self.y -= yspeed;
            
            self.$char.css({
                left: self.x,
                top: self.y
            });
        });
        
        chars.push(this);
    };
});