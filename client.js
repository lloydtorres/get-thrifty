let thrift = require('thrift');
let GetThriftyService = require('./gen-nodejs/GetThriftyService');
let gtypes = require('./gen-nodejs/get_types')

let transport = thrift.TBufferedTransport;
let protocol = thrift.TBinaryProtocol;

var host = "localhost";
var port = 8080;
if (process.env.PORT) {
  host = "megumin-get-thrifty.herokuapp.com";
  port = process.env.PORT;
}

var connection = thrift.createConnection(host, port, {
  transport: transport,
  protocol: protocol
});

connection.on('error', function(err) {
  assert(false, err);
});

let client = thrift.createClient(GetThriftyService, connection);
let handler = function(err, message) {
  if (err) {
    console.log("Error! " + err);
  } else {
    console.log(message);
  }
};

client.sayHello('Megumin', handler);

client.getBestGirl(handler);

client.ping();
