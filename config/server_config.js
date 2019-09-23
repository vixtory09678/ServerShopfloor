exports.getServerConfig = function () {
    return [{
        'host': '192.168.43.249',
        'port': '5002',
        'reconnectInterval': 1000,
        'reconnectTimes': 100,
        'autoReconnect': true,
        'reconnectTimeout': 1000,
        'timeout': 5000
    }, {
        'host': '192.168.43.1',
        'port': '5002',
        'reconnectInterval': 1000,
        'reconnectTimes': 100,
        'autoReconnect': true,
        'reconnectTimeout': 1000,
        'timeout': 5000,
        'unitId': 2
    }]

}