$(function() {
    function hero() {
        var DEFAULT_SPEED = 4;
        
        var animSpeed = 8,
            animCount = 6,
            animFrame = 0;
        
        var moveMap = {};
            moveMap[Key.UP] = [0, -1, 0];
            moveMap[Key.RIGHT] = [1, 0, 1];
            moveMap[Key.DOWN] = [0, 1, 2];
            moveMap[Key.LEFT] = [-1, 0, 3];
        
        var pressed = {},
            moving = false,
            moveAllowed = false,
            dir = 0;
        
        this.collWidth = 30;
        this.collHeight = 30;
        this.collX = parseInt(this.width / 2 - this.collWidth / 2);
        this.collY = this.height - this.collHeight;
        
        this.canTalkTo = null;
        
        $wnd
            .keydown(function(e) {
                if (!pressed[e.which]) pressed[e.which] = true;
            })
            .keyup(function(e) {
                if (pressed[e.which]) delete pressed[e.which];
            });
        
        this.handleInput = function() {
            if (!moveAllowed) return;
            
            if (pressed[Key.ATTACK] && this.canTalkTo) {
                moveAllowed = false;
                Text.writeBatch(this.canTalkTo.opts.texts, {}, function() {
                    moveAllowed = true;
                });
            }
            
            var speed = pressed[Key.RUN] ? DEFAULT_SPEED * 2 : DEFAULT_SPEED,
                movement = {x: 0, y: 0};
            
            moving = false;
            $.each(pressed, function(key) {
                if (moveMap[key]) {
                    movement.x += moveMap[key][0] * speed;
                    movement.y += moveMap[key][1] * speed;
                    speed /= 2;
                    if (!moving) {
                        dir = moveMap[key][2];
                        moving = true;
                    } else {
                        return false;
                    }
                }
            });
            
            if (moving) {
                var bgPosX = ((dir * animCount + parseInt(animFrame / animSpeed)) * -this.$char.width()) + 'px';
                var bgPosY = '-64px';
                
                if (++animFrame === animSpeed * animCount - 1) {
                    animFrame = 0;
                }
            } else {
                var bgPosX = (dir * -this.$char.width()) + 'px';
                var bgPosY = 0;
                animFrame = 0;
            }
            
            this.move(movement.x, movement.y, bgPosX + ' ' + bgPosY);
            
            return this;
        };
        
        this.setMoveAllowed = function(allow) {
            moveAllowed = allow;
            return this;
        };
    }
    
    hero.prototype = new Char({id: 'hero'});
    
    Hero = new hero();
});
