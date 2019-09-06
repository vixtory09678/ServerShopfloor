module.exports = function () {
    var mqtt = require('mqtt')
    var client = mqtt.connect('ws://127.0.0.1:9001')
    var mqttHandle = require('../app/controllers/mqtt.controller');
    mqttHandle.setClient(client);

    client.on('connect', mqttHandle.onConnect);
    client.on('message', mqttHandle.onMessage);
    client.on('error', mqttHandle.onError);

    return client;
}