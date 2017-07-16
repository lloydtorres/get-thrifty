let thrift = require('thrift');
let GetThriftyService = require('./gen-nodejs/GetThriftyService');
let gtypes = require('./gen-nodejs/get_types')

var server = thrift.createServer(GetThriftyService, {
  sayHello: function(name, result) {
    console.log("sayHello(" + name + ") called.");
    result(null, "Hello " + name + "!");
  },
  getBestGirl: function(result) {
    console.log("getBestGirl() called.");
    result(null, "Emilia");
  },
  ping: function() {
    console.log("ping() called");
    result(null);
  }
});
server.listen(process.env.PORT || 8080);
console.log("Server started at port " + (process.env.PORT || 8080) + ".");
