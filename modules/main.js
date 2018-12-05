const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const handlers = require('./handlers');
const token = require('./token');

/* create Pizza Delivery object */
var pizzadelivery = {};

pizzadelivery.start_server = http.createServer(function (req, res) {
    console.log('got a request...');

    //parse url
    const parsedUrl = url.parse(req.url, true);

    //get path
    const path = parsedUrl.path;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log('path', path, 'trimmedPath', trimmedPath);

    //handle request
    const decoder = new StringDecoder('utf8');
    var buffer = '';

    //parse request
    req.on('data', chunk => {
        buffer += decoder.write(chunk);
    });
    
    req.on('end', () => {
        buffer += decoder.end();
        
        console.log('A chunk of data has arrived: ', buffer);

        token.encrypt('Praveen Kumar Sharma');

        // form data to send
        var data = {
            'method': req.method,
            'headers': req.headers,
            'payload': buffer
        };

        // map handler to path, if bad path map to 404
        var chosenHandler = typeof( handlers[trimmedPath] ) !== 'undefined'? handlers[trimmedPath]: handlers.notfound;

        // call handler
        chosenHandler(data, function(statusCode, payload) {
            console.log('in chosenHandler...', payload);

            payload = typeof( payload ) == 'object'? payload: {};

            res.writeHead(statusCode);
            res.end(JSON.stringify( payload ));
        })
    });
    
}).listen(8080);

module.exports = pizzadelivery;