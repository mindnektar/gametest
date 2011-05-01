$(function() {

UI = new function() {
    var $ui = $('#ui'),
        $uiHpCur = $('#ui-hp-cur'),
        $uiHpMax = $('#ui-hp-max'),
        $uiHpBar = $('#ui-hp-bar div');
    
    this.init = function() {
        this.updateHP();
    };
    
    this.show = function() {
        $ui.show();
    };
    
    this.hide = function() {
        $ui.hide();
    };
    
    this.updateHP = function() {
        $uiHpCur.text(Hero.hp);
        $uiHpMax.text(Hero.hpMax);
        $uiHpBar.width(parseInt((Hero.hp / Hero.hpMax) * 200));
    };
};

UI.init();

});
