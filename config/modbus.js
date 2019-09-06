'use strict'

const modbus = require('jsmodbus')
var reconnect = require('net-socket-reconnect')

var options = {
    'host': '192.168.43.249',
    'port': '5002',
    'reconnectInterval': 1000,
    'reconnectTimes': 100
}

var socket = reconnect(options) // no change to original API
var modbusController = require('../app/controllers/modbus.controller')

exports.run = function (mqtt) {
    var modbusClient = new modbus.client.TCP(socket)
    socket.on('connect', function () {

        setInterval(function () {
            modbusController.requestControlChartData(modbusClient, socket, mqtt)
        }, 4000)
        setInterval(function () {
            modbusController.requestParetoChartData(modbusClient, socket, mqtt)
        }, 4000)
        setInterval(function () {
            modbusController.requestAlarm(modbusClient, socket, mqtt)
        }, 1000)
    });
    socket.on('error', function (err) {
        console.log('Client Error', err)
    })
    socket.on('close', function (err) {
        console.log('Client Close', err)
    })

    // socket.connect(options)
}