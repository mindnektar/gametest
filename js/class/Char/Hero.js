$(function() {

Hero = new function() {
    Char.call(this, {id: 'hero'});
    
    var DEFAULT_SPEED = 4;
    
    var animSpeed = 8,
        animCount = 6,
        animFrame = 0,
        breakAnim = $.noop;
    
    var moveMap = {};
        moveMap[Key.UP] = [0, -1, 0];
        moveMap[Key.RIGHT] = [1, 0, 1];
        moveMap[Key.DOWN] = [0, 1, 2];
        moveMap[Key.LEFT] = [-1, 0, 3];
    
    var pressed = {},
        moving = false,
        moveAllowed = false;
    
    this.dir = 2;
    
    this.collWidth = 30;
    this.collHeight = 30;
    this.collX = parseInt(this.width / 2 - this.collWidth / 2);
    this.collY = this.height - this.collHeight;
    
    this.hp = 100;
    this.hpMax = 100;
    
    this.canTalkTo = null;
    
    $wnd
        .keydown(function(e) {
            if (!pressed[e.which]) pressed[e.which] = true;
        })
        .keyup(function(e) {
            if (pressed[e.which]) delete pressed[e.which];
        });
    
    this.$char.bind('hpchange', function(e, value) {
        UI.updateHP(value);
    });
    
    this.correctPosition = $.noop;
    
    this.handleInput = function() {
        if (!moveAllowed) {
            breakAnim.call(this);
            return;
        }
        
        if (pressed[Key.ATTACK] && this.canTalkTo) {
            moveAllowed = false;
            Text.writeBatch(this.canTalkTo.opts.texts, {}, function() {
                moveAllowed = true;
            });
        }
        
        var speed = pressed[Key.RUN] ? DEFAULT_SPEED * 2 : DEFAULT_SPEED,
            movement = {x: 0, y: 0},
            self = this;
        
        moving = false;
        $.each(pressed, function(key) {
            if (moveMap[key]) {
                movement.x += moveMap[key][0] * speed;
                movement.y += moveMap[key][1] * speed;
                speed /= 2;
                if (!moving) {
                    self.dir = moveMap[key][2];
                    moving = true;
                } else {
                    return false;
                }
            }
        });
        
        if (moving) {
            var bgPosX = ((this.dir * animCount + parseInt(animFrame / animSpeed)) * -this.width) + 'px';
            var bgPosY = '-64px';
            
            if (++animFrame === animSpeed * animCount - 1) {
                animFrame = 0;
            }
        } else {
            var bgPosX = (this.dir * -this.width) + 'px';
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
    
    this.setBreakAnim = function(func) {
        breakAnim = func;
        animFrame = 0;
        moveAllowed = false;
        return this;
    };
    
    this.doDamageAnim = function() {
        var cycleLength = 16,
            xspeed = 0, yspeed = 0,
            bgPosX = 0, bgPosY = 0;
        
        animFrame++;
        
        switch (this.dir) {
            case 0: yspeed = 2; break;
            case 1: xspeed = -2; break;
            case 2: yspeed = -2; break;
            case 3: xspeed = 2; break;
        }

        this.move(xspeed, yspeed, (-this.dir * this.width) + 'px 0');
        
        if (animFrame === cycleLength) {
            moveAllowed = true;
            breakAnim = $.noop;
        }
    };
}

});
