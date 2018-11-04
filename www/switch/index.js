var client;

function connect() {
  console.log('Connecting');
  client = mqtt.connect('wss://mqtt.iotwork.shop:8083', {
    username: username.value,
    password: password.value 
  });

  client.on('connect', function () {    
    console.log('connected');
    radioButtons.disabled = false;
    connectButton.hidden = true;
  })

  client.on('error', function (message) {
    alert(message);
    client.end();
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic, message.toString());
  })
}

function on() {
    client.publish(topic.value, 'ON');
    console.log('on');
}

function off() {
    client.publish(topic.value, 'OFF');
    console.log('off');
}


