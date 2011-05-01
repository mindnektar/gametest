$(function() {

Text = new function() {
    var self = this,
        $text = $('#text'),
        $content = $('#text-content'),
        $confirm = $('#text-confirm'),
        top = {
            top: 0,
            center: 168,
            bottom: 336
        },
        progressBlocked = false;
    
    // Pre-load the box image
    new Image('img/text.gif');
    
    $wnd.keyup(function(e) {
        if (e.which == Key.ATTACK) {
            progressBlocked = false;
        }
    });
    
    function write(text, opts, callback) {
        var dflt = {
            className: 'default',
            color: '#fff',
            fontSize: '16px',
            position: 'bottom',
            speed: 20,
            skipAfter: 0
        };
        opts = $.extend(dflt, opts);
        
        var chars = text.split(''),
            printingChar;
        
        $text
            .attr('class', 'text-' + opts.className)
            .css({
                top: top[opts.position],
                color: opts.color,
                fontSize: opts.fontSize
            })
            .show();
        
        if (!opts.skipAfter) {
            $wnd.keydown(skipEvent);
        }
        
        var i = 0;
        function printChar() {
            $content[0].innerHTML += chars[i];
            
            if (chars[++i]) {
                printingChar = setTimeout(printChar, opts.speed);
            } else {
                if (opts.skipAfter) {
                    setTimeout(proceed, opts.skipAfter);
                } else {
                    bindProceed();
                }
            }
        }
        
        function skipEvent(e) {
            if (!progressBlocked && e.which == Key.ATTACK) {
                progressBlocked = true;
                $content.html(text);
                clearTimeout(printingChar);
                bindProceed();
            }
        }
        
        function bindProceed() {
            Sound.stopSound('text');
            $confirm.show();
            $wnd
                .unbind('keydown', skipEvent)
                .keydown(proceedEvent);
        }
        
        function proceedEvent(e) {
            if (!progressBlocked && e.which == Key.ATTACK) {
                progressBlocked = true;
                proceed();
            }
        }
        
        function proceed() {
            $content.html('');
            $text.hide();
            $confirm.hide();
            
            $wnd.unbind('keydown', proceedEvent);
            callback();
        }
        
        Sound.playSound('text');
        
        printChar();
    };
    
    this.writeBatch = function(texts, opts, callback) {
        if (progressBlocked) {
            callback && callback();
            return;
        }
        
        UI.hide();
        
        var key = -1;
        (function() {
            key++;
            if (texts[key]) {
                write(texts[key], opts, arguments.callee);
            } else {
                UI.show();
                callback && callback();
            }
        })();
    }
};

});
