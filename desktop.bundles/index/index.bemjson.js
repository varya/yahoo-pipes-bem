({
    block: 'b-page',
    title: 'Yahoo pipe widget',
    head: [
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'css', url: '_index.ie.css', ie: 'gte IE 6' },
        { elem: 'meta', attrs: { name: 'description', content: '' }}
    ],
    content:[
        {
            block: 'yahoo-pipe-widget',
            pipeId: 'DqsF_ZG72xGLbes9l7okhQ'
        },
        { block: 'i-jquery', mods: { version: '1.8.3' } },
        { elem: 'js', url: '_index.bemhtml.js' },
        { elem: 'js', url: '_index.js' }
    ]
})
