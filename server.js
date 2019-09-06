var mqttProtocol = require('./config/mqtt')
var mqtt = mqttProtocol();

var modbus = require('./config/modbus');
modbus.run(mqtt);

console.log("mqtt at port 9001");
console.log("Modus connect at 192.168.43.249\n\n");