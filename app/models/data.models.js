const error_description = [
    "Load valve body",
    "Insert seal body",
    "Check seal body",
    "Insert Key",
    "Place key",
    "Insert ball",
    "Check ball",
    "Insert seal tail",
    "Check seal tail",
    "Load tail",
    "Insert tail",
    "Glue",
    "Test torque"
]

exports.getErrorDescription = function (id) {
    return error_description[id]
}


exports.controlChartModel = function (name, ip, values) {
    var data = {
        name: name,
        ip: ip,
        data: {
            good: values[0],
            bad: values[1],
            total: (values[0] + values[1]),
            totalTime: values[2],
            timeError: values[3]
        }
    }
    return data
}

exports.paretoChartModel = function (name, ip, err_id, values) {
    var data = {
        name: name,
        ip: ip,
        error: {
            error_id: err_id,
            description_error: error_description[err_id],
            error_stack: values[0],
            time_error: values[1]
        }
    }
    return data
}