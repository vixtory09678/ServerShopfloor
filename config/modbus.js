'use strict'

const modbus = require('jsmodbus')
var reconnect = require('net-socket-reconnect')
var serverConfig = require('./server_config')

var options = serverConfig.getServerConfig()
console.log(options);

var socket = []
options.forEach(option => {
    socket.push(reconnect(option))
});
console.log(socket);

var modbusController = require('../app/controllers/modbus.controller')

exports.run = function (mqtt) {
    for (let i = 0; i < socket.length; i++) {
        var modbusClient = new modbus.client.TCP(socket[i])
        socket[i].on('connect', function () {

            setInterval(function () {
                modbusController.requestControlChartData(modbusClient, socket[i], mqtt)
            }, 4000)
            // setInterval(function () {
            //     modbusController.requestParetoChartData(modbusClient, socket[i], mqtt)
            // }, 4000)
            setInterval(function () {
                modbusController.requestAlarm(modbusClient, socket[i], mqtt)
            }, 1000)
        });
        socket[i].on('error', function (err) {
            console.log(`Client Error ${i}`, err)
        })
        socket[i].on('close', function (err) {
            console.log(`Client Close ${i}`, err)
        })
    }


    // socket.connect(options)
}