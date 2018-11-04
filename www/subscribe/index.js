var client;

function connect() {
  console.log('Connecting');
  client = mqtt.connect('wss://mqtt.iotwork.shop:8083', {
    username: username.value,
    password: password.value 
  });

  client.on('connect', function () { 
    pre.innerText = '';   
    console.log('connected');
    connectButton.hidden = true;
    disconnectButton.hidden = false;
    client.subscribe(topic.value);
  })

  client.on('message', function (topic, message) {
    // message is Buffer so call toString before logging
    console.log(topic, message.toString()); 
    pre.innerText += '\n' + new Date() + '\t' + topic + '\t' + message;
    window.scrollTo(0,document.body.scrollHeight);
  })

  client.on('error', function (message) {
      alert(message);
      client.end();
  })
}

function disconnect() {
  if (client) {
    client.end();
  }
  connectButton.hidden = false;
  disconnectButton.hidden = true;
}

