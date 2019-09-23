'use strict'
var serverConfig = require('./server_config')
var modbusController = require('../app/controllers/modbus.controller')
var options = serverConfig.getServerConfig()
var async = require('async')

exports.run = function (mqtt) {
    options.forEach(option => {
        setInterval(() => {
            modbusController.readStateMachine(option, (resp) => {
                console.log(resp);
            }, mqtt)
        }, 4000)
    })
}