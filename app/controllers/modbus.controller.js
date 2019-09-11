var modbusController = require("./modbus.controller");
var model = require("../models/data.models");
var machine_config = require("../../config/machine_config");

var stateCheckDuplicate = [false, false, false, false, false, false, false, false, false, false, false, false, false]

exports.requestControlChartData = function (req, socket, mqtt) {
    req
        .readHoldingRegisters(0, 4)
        .then(function (resp) {
            var data = model.controlChartModel(
                machine_config.name,
                machine_config.ip,
                resp.response._body._values
            );

            var strJson = JSON.stringify(data.data);

            console.log(`String json ${strJson}`);
            mqtt.publish("data/maintenance/control_chart", strJson, err => {
                if (err) console.log(`public error is ${err}`);
            });
        })
        .catch(function () {
            socket.end();
        });
};

exports.requestParetoChartData = function (req, socket, mqtt) {
    req
        .readHoldingRegisters(5, 26)
        .then(function (resp) {

            var data = [];
            for (let i = 0; i < 13; i++) {
                data.push(
                    model.paretoChartModel(machine_config.name, machine_config.ip, id, [
                        resp.response._body._values[i],
                        resp.response._body._values[i + 13]
                    ])
                );
            }

            var strJson = JSON.stringify(data);
            mqtt.publish("data/maintenance/pareto_chart", strJson, err => {
                if (err) console.log(`public pareto error is ${err}`);
            });
        })
        .catch(function () {
            socket.end();
        });
};

exports.requestAlarm = function (req, socket, mqtt) {
    req.readHoldingRegisters(4, 1)
        .then(function (resp) {
            for (let i = 0; i < 13; i++) {
                var state = (resp.response._body._values >> i);
                var data = {
                    mc_id: 1443,
                    name: machine_config.name,
                    ip: machine_config.ip,
                    id_error: i,
                    description_error: model.getErrorDescription(i)
                };

                if (state & 0x01) {
                    if (!stateCheckDuplicate[i]) {
                        stateCheckDuplicate[i] = true;
                        var strJson = JSON.stringify(data);
                        console.log(`print error station ${strJson}`)
                        mqtt.publish("data/maintenance/alarm", strJson);
                    }
                } else {
                    if (stateCheckDuplicate[i]) {
                        stateCheckDuplicate[i] = false;

                        data.description_error = "clear";
                        var strJson = JSON.stringify(data)
                        console.log(`print clear error station ${strJson}`)
                        mqtt.publish("data/maintenance/alarm", strJson, err => {
                            if (err) console.log(`public alarm error is ${err}`);
                        });
                    }
                }
            }
        })
        .catch(function () {
            socket.end();
        });
};