var mqtt = require('mqtt')

var user = 'don';
var password = 'arduino1010';
var server = 'mqtts://mqtt.iotwork.shop';

var client  = mqtt.connect(server, {
    host: 'mqtt.iotwork.shop',
    port: 8883,
    username: user,
    password, password,
    clientId: 'node'
})

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      //client.publish('presence', 'Hello mqtt')
      console.log("connected");
    }
  })
  client.subscribe("\#")
})

client.on('message', function (topic, message) {
  // message is Buffer
  //console.log(message.toString())
  console.log(topic, message.toString());
  //client.end()
})