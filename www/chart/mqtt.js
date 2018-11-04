let deviceId = 'deviceX';
let username = 'userX';
let password = 'superconf18!';

var client = mqtt.connect('wss://mqtt.iotwork.shop:8083', {
  username: username,
  password: password
});

client.on('connect', function () {
  console.log("connected");
  client.subscribe(`workshop/${deviceId}/temperature`);
  client.subscribe(`workshop/${deviceId}/humidity`);
});

client.on('message', function (topic, message) {
  // message is Buffer  
  console.log(topic, message.toString());

  let dt = new Date().toLocaleString();

  if (topic.match(/temperature/)) {
    temperatureData.labels.push(dt);
    temperatureData.datasets[0].data.push(parseFloat(message.toString()));
    temperatureChart.update();

  } else if (topic.match(/humidity/)) {
    humidityData.labels.push(dt);
    humidityData.datasets[0].data.push(parseFloat(message.toString()));
    humidityChart.update();
  }
});

client.on('error', function (message) {
  alert(message);
  client.end();
})
