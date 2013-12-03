/** @requires BEM.DOM */

(function(){

    /**
     * A widget with yahoo pipes
     */
BEM.DOM.decl('yahoo-pipe-widget', {

    onSetMod : {
        'js' : {
            'inited' : function() {
                console.log('I am inited');
            }
        }
    }

}, {

    /**
     * With no "live" section in the static methods
     * all the components are inited on domReady
     */

});

})();
