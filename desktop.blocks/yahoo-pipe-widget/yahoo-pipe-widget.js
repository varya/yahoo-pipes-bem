/** @requires BEM.DOM */

(function(){

    /**
     * A widget with yahoo pipes
     */
BEM.DOM.decl('yahoo-pipe-widget', {

    onSetMod : {
        'js' : {
            'inited' : function() {

                /**
                 * "i-request_type_ajax" is a dataprovider component for
                 * cross-domain (JSONP) requests
                 */
                this._dataProvider = BEM.create('i-request_type_ajax', {
                    url: 'http://pipes.yahoo.com/pipes/pipe.run',
                    callbackCtx: this,
                    jsonp: '_callback'
                });
                this._dataProvider.get(
                    {
                        _id : this.params.pipeId,
                        _render: 'json'
                    },
                    function() {
                        console.log(arguments);
                    }
                )
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
