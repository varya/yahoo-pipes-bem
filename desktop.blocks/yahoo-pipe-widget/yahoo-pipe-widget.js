/** @requires BEM.DOM */

(function(){

var urlParser = function(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser;
}

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
                        _id : this.params.pipeId,
                        _render: 'json'
                    },
                    function(data) {
                        var list = [],
                            items = data.value.items;
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
                    }
                )
            }
        }
    },
    createList: function(list){
        var listBlocks = $.map(list, function(item){
            console.log(item.desc);
            return {
                block: 'yahoo-pipe-widget',
                elem: 'item',
                content: [
                    {
                        elem: 'title',
                        content: item.title
                    },
                    {
                        elem: 'desc',
                        mods: { hidden: true },
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
        BEM.DOM.append(this.domElem, BEMHTML.apply(listBlocks));
    },
    setCurrent: function(item) {
        console.log(item);
    }

}, {

    live: function() {

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
