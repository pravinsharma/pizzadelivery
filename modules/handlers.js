//define handlers
var handlers = {
    "hello": function(data, callback) {
        console.log('in hello handler', data);
        
        //callback(200, data);
        callback(200, {"greeting": "Hello World!..."} ); //overriding payload for customized message
    },

    "notfound": function(data, callback) {
        callback(404);
    }
};

module.exports = handlers;