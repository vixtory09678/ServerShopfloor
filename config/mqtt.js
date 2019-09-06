module.exports = function () {
    var mqtt = require('mqtt')
    var client = mqtt.connect('ws://192.168.43.70:9001')
    var mqttHandle = require('../app/controllers/mqtt.controller');
    mqttHandle.setClient(client);

    client.on('connect', mqttHandle.onConnect);
    client.on('message', mqttHandle.onMessage);
    client.on('error', mqttHandle.onError);

    return client;
}