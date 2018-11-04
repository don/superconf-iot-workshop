let deviceId = 'deviceX';
let username = 'userX';
let password = 'superconf18!';

var client = mqtt.connect('wss://mqtt.iotwork.shop:8083', {
    username: username,
    password: password
});

client.on('connect', function () {
    console.log('connected');
    client.subscribe(`workshop/${deviceId}/temperature`);
    client.subscribe(`workshop/${deviceId}/humidity`);
});

client.on('message', function (topic, message) {
    // message is Buffer  
    console.log(topic, message.toString());

    if (topic.match(/temperature/)) {
        // Kludge: Temperature arrives first, so use that data and time
        let dt = new Date().toLocaleString();
        data.labels.push(dt);
        data.datasets[0].data.push(parseFloat(message.toString()));
    } else if (topic.match(/humidity/)) {
        // using timestamp from last temperature message
        data.datasets[1].data.push(parseFloat(message.toString()));
    }

    chart.update();
});
