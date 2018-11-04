var client;

function connect() {
  client = mqtt.connect('wss://mqtt.iotwork.shop:8083', {
    username: username.value,
    password: password.value 
  });

  client.on('connect', function () { 
    client.subscribe(topic.value);
  })

  client.on('message', function (topic, message) {
    console.log(topic, message.toString()); 
    pre.innerText += '\n' + topic + '\t' + message;
  })
}

function disconnect() {
  if (client) {
    client.end();
  }
  connectButton.hidden = false;
  disconnectButton.hidden = true;
}

