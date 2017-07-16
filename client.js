let thrift = require('thrift');
let assert = require('assert');
let GetThriftyService = require('./gen-nodejs/GetThriftyService');
let gtypes = require('./gen-nodejs/get_types')

let transport = thrift.TFramedTransport;
let protocol = thrift.TBinaryProtocol;

let isLocal = true;
let host = isLocal ? "localhost" : "megumin-get-thrifty.herokuapp.com";
let port = isLocal ? 8080 : 80;

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
