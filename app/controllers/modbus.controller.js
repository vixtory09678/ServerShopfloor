const modbus = require('jsmodbus')
const net = require('net')
const client = new net.Socket()
exports.readStateMachine = function (station, mqtt) {

    var modbusClient = modbus.client.TCP(client, station.unitId)
    var modbusController = require('./modbus_request.controller')

    client.on('connect', function () {
        modbusController.requestControlChartData(modbusClient, client, mqtt)
        modbusController.requestAlarm(modbusClient, client, mqtt)

    });
    client.on('error', function (err) {
        console.log(`Client Error unit[${station.unitId}]`, err)
    })
    client.on('close', function (err) {
        console.log(`Client Close unit[${station.unitId}]`, err)
    })

    client.connect({
        'host': station.ip,
        'port': station.port,
        'reconnectInterval': 1000,
        'reconnectTimes': 100
    });
}