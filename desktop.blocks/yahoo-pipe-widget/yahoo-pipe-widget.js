/** @requires BEM.DOM */

(function(){

var urlParser = function(url) {
    // Fake "a" node for parsing URLs
    var parser = document.createElement('a');
    parser.href = url;
    return parser;
}

/**
 * Merges host and relative path
 */
var imageUrl = function(host, image) {
    if (!image) return;

    host = urlParser(host);
    image = urlParser(image);

    var res = [
        host.protocol,
        '//',
        host.host
    ]
    if (image.pathname.indexOf('/') != 0) {
        res.push(host.pathname);
    }
    res.push(image.pathname);

    return res.join('');
}

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
                        /**
                         * There is no limit (parameter), which
                         * makes to use loop below. If limitation is possible,
                         * it should be placed here.
                         */
                        _id : this.params.pipeId,
                        _render: 'json'
                    },
                    /**
                     * Callback to run in cause of success
                     */
                    function(data) {
                        /**
                         * Change widget status when data is loaded
                         */
                        this.setMod('status', 'loaded');

                        /**
                         * From data for the list
                         */
                        var list = [],
                            items = data.value.items;

                        /**
                         * Limitation in request is missing,
                         * loops is a hack here
                         */
                        for (var i=0;i<10;i++){
                            var item = items[i];
                            list.push({
                                title: item.title,
                                desc: item.description,
                                image: imageUrl(item.link, item.content),
                                link: item.link
                            });
                        }

                        this.createList(list);
                    },
                    /**
                     * Callback to run in case of error
                     */
                    function() {
                        /**
                         * Change widget status in case of error
                         */
                        this.setMod('status', 'error');
                    }
                )

                /**
                 * Change status after the request is sent
                 */
                this.setMod('status', 'loading');
            }
        }
    },

    /**
     * Creates View-oriented JSON from
     * data
     */
    createList: function(list){

        var listBlocks = $.map(list, function(item){
            return {
                block: 'yahoo-pipe-widget',
                elem: 'item',
                content: [
                    {
                        elem: 'pic',
                        url: item.image
                    },
                    {
                        elem: 'title',
                        content: item.title
                    },
                    {
                        elem: 'desc',
                        content: [
                            item.desc,
                            {
                                elem: 'link',
                                url: item.link
                            }
                        ]
                    }
                ]
            }
        });

        /**
         * Templates are applied to View-oriented JSON and then
         * the result is inserted into the widget
         */
        BEM.DOM.append(this.domElem, BEMHTML.apply(listBlocks));
    },

    /**
     * Sets current item
     */
    setCurrent: function(item) {

        /**
         * Previously opened item shoud be closed
         */
        if (this._currentItem) {
            this.delMod(this._currentItem, 'opened', 'true');
        }

        /**
         * Change item state
         */
        this.setMod(item, 'opened', 'true');
        this._currentItem = item;
    }

}, {

    live: function() {

        /**
         * Binding to "live" click event, using delegation
         */
        this.liveBindTo('item', 'click', function(e){
            this.setCurrent(e.data.domElem);
        });

        /**
        * With returning "false" in "live" section in the
        * static methods all the components are inited on domReady
        */
        return false;
    }


});

})();
