$(function() {
    var chars = [];
    
    Char = function(opts) {
        var self = this;
        
        var dflt = {
            flying: false,
            friendly: true,
            texts: []
        };
        this.opts = $.extend(dflt, opts);
        
        this.$char = $('<div class="char"></div>').appendTo($level);
        if (this.opts.className) this.$char.addClass(this.opts.className);
        if (this.opts.id) this.$char.attr('id', this.opts.id);
        
        this.id = chars.length;
        
        this.x = 0;
        this.y = 0;
        this.width = this.$char.width();
        this.height = this.$char.height();
        
        this.collX = this.collX || 0;
        this.collY = this.collY || 0;
        this.collWidth = this.collWidth || this.width;
        this.collHeight = this.collHeight || this.height;
        
        this.xInLevel = 0;
        this.yInLevel = 0;
        
        this.xspeed = 0;
        this.yspeed = 0;
        
        this.put = function(xpos, ypos) {
            xpos += this.collX;
            ypos += this.collY;
            
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
            
            var charCss = {backgroundPosition: bgPos},
                bgPos = $level.css('background-position').split(' '),
                bgPosChanges = {x: 0, y: 0};
            
            if (this.xspeed || this.yspeed) {
                this.checkCharCollisions();
            }
            
            if (this.xspeed || this.yspeed) {
                !this.opts.flying && this.checkLevelCollisions();
            }
            
            if (
                this.id === 0 &&
                (
                    (this.xspeed < 0 && this.nearLeftBorder()) ||
                    (this.xspeed > 0 && this.nearRightBorder())
                )
            ) {
                if (Level.x + this.xspeed < 0) this.xspeed = -Level.x;
                if (Level.x + 640 + this.xspeed > Level.width) this.xspeed = Level.width - 640 - Level.x; 
                Level.x += this.xspeed;
                bgPos[0] = (parseInt(bgPos[0]) - this.xspeed) + 'px';
                bgPosChanges.x = this.xspeed;
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
                if (Level.y + this.yspeed < 0) this.yspeed = -Level.y;
                if (Level.y + 480 + this.yspeed > Level.height) this.yspeed = Level.height - 480 - Level.y; 
                Level.y += this.yspeed;
                bgPos[1] = (parseInt(bgPos[1]) - this.yspeed) + 'px';
                bgPosChanges.y = this.yspeed;
            } else {
                this.y += this.yspeed;
                charCss.top = this.y;
            }
            
            this.xInLevel += this.xspeed;
            this.yInLevel += this.yspeed;
            
            if (bgPosChanges.x || bgPosChanges.y) {
                $.each(chars, function() {
                    this.correctPosition(bgPosChanges.x, bgPosChanges.y);
                });
                $level.css({backgroundPosition: bgPos.join(' ')});
            }
            
            this.$char.css(charCss);
            
            return this;
        };
        
        this.checkCharCollisions = function() {
            var self = this,
                newX = this.xInLevel + this.xspeed,
                newY = this.yInLevel + this.yspeed;
            
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
                    if (nextToRight && nextToLeft) {
                        if (self.yspeed < 0) {
                            self.yspeed = (char.yInLevel + char.collY + char.collHeight) - (self.yInLevel + self.collY);
                        } else {
                            self.yspeed = (char.yInLevel + char.collY) - (self.yInLevel + self.collY + self.collHeight);
                        }
                    }
                    if (nextToDown && nextToUp) {
                        if (self.xspeed < 0) {
                            self.xspeed = (char.xInLevel + char.collX + char.collWidth) - (self.xInLevel + self.collX);
                        } else {
                            self.xspeed = (char.xInLevel + char.collX) - (self.xInLevel + self.collX + self.collWidth);
                        }
                    }
                }
                
                if (self.id === 0 && char.opts.friendly) {
                    self.canTalkTo = (insideDown && insideUp && nextToLeft && nextToRight) || (insideLeft && insideRight && nextToUp && nextToDown) ? char : null;
                }
            });
        };
        
        this.checkLevelCollisions = function() {
            var self = this,
                newX = this.xInLevel + this.xspeed,
                newY = this.yInLevel + this.yspeed;
            
            if (
                (
                    this.xspeed < 0 &&
                    (
                        Level.coll[parseInt((this.yInLevel + this.collY) / 32)][parseInt((newX + this.collX) / 32)] ||
                        Level.coll[parseInt((this.yInLevel + this.collY + this.collHeight) / 32)][parseInt((newX + this.collX) / 32)]
                    )
                ) || (
                    this.xspeed > 0 &&
                    (
                        Level.coll[parseInt((this.yInLevel + this.collY) / 32)][parseInt((newX + this.collX + this.collWidth) / 32)] ||
                        Level.coll[parseInt((this.yInLevel + this.collY + this.collHeight) / 32)][parseInt((newX + this.collX + this.collWidth) / 32)]
                    )
                )
            ) {
                if (self.xspeed < 0) {
                    self.xspeed = (this.xInLevel + this.collX) - parseInt((this.xInLevel + this.collX) / 32) * 32;console.log(this.xInLevel + this.collX);
                } else {
                    self.xspeed = parseInt((this.xInLevel + this.collX + this.collWidth) / 32) * 32 - (this.xInLevel + this.collX);
                }
            }
            
            if (
                (
                    this.yspeed < 0 &&
                    (
                        Level.coll[parseInt((newY + this.collY) / 32)][parseInt((this.xInLevel + this.collX) / 32)] ||
                        Level.coll[parseInt((newY + this.collY) / 32)][parseInt((this.xInLevel + this.collX + this.collWidth) / 32)]
                    )
                ) || (
                    this.yspeed > 0 &&
                    (
                        Level.coll[parseInt((newY + this.collY + this.collHeight) / 32)][parseInt((this.xInLevel + this.collX) / 32)] ||
                        Level.coll[parseInt((newY + this.collY + this.collHeight) / 32)][parseInt((this.xInLevel + this.collX + this.collWidth) / 32)]
                    )
                )
            ) {
                if (self.yspeed < 0) {
                    self.yspeed = (this.yInLevel + this.collY) - parseInt((this.yInLevel + this.collY) / 32) * 32;
                } else {
                    self.yspeed = parseInt((this.yInLevel + this.collY + this.collHeight) / 32) * 32 - (this.yInLevel + this.collY);
                }
            }
        };
        
        this.nearLeftBorder = function() {
            return this.x <= 240 && Level.x > 0;
        };
        
        this.nearRightBorder = function() {
            return this.x + this.width >= 400 && Level.x < Level.width - 640;
        };
        
        this.nearTopBorder = function() {
            return this.y <= 180 && Level.y > 0;
        };
        
        this.nearBottomBorder = function() {
            return this.y + this.height >= 300 && Level.y < Level.height - 480;
        };
        
        this.correctPosition = function(xspeed, yspeed) {
            if (this.id === 0) return;
            
            this.x -= xspeed;
            this.y -= yspeed;
            
            this.$char.css({
                left: this.x,
                top: this.y
            });
        };
        
        chars.push(this);
    };
});