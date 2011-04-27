$(function() {

Text = new function() {
    var self = this,
        $text = $('#text'),
        $content = $('#text-content'),
        $confirm = $('#text-confirm'),
        top = {
            top: 0,
            center: 168,
            bottom: 328
        };
    
    this.write = function(text, opts, callback) {
        var dflt = {
            className: 'text-default',
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
            .attr('class', opts.className)
            .css({
                top: top[opts.position],
                color: opts.color,
                fontSize: opts.fontSize
            })
            .show();
        
        if (!opts.skipAfter) {
            $wnd.keyup(function(e) {
                if (e.which == Key.ATTACK) {
                    $content.html(text);
                    clearTimeout(printingChar);
                    bindProceed();
                }
            });
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
        
        function bindProceed() {
            $confirm.show();
            $wnd
                .unbind('keyup', this.caller)
                .keyup(function(e) {
                    if (e.which == Key.ATTACK) {
                        proceed();
                    }
                });
        }
        
        function proceed() {
            $content.html('');
            $text.hide();
            $confirm.hide();
            $wnd.unbind('keyup', this.caller);
            callback();
        }
        
        printChar();
    };
    
    this.writeBatch = function(texts, opts, callback) {
        function handleText() {
            key++;
            if (texts[key]) {
                self.write(texts[key], opts, handleText);
            } else {
                callback && callback();
            }
        }
        var key = -1;
        handleText();
    }
};

});
