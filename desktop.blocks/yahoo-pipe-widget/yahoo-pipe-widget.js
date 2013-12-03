/** @requires BEM.DOM */

(function(){

BEM.DOM.decl('yahoo-pipe-widget', {

    onSetMod : {
        'js' : {
            'inited' : function() {
                console.log('I am inited');
            }
        }
    }

});

})();
