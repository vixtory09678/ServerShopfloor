var client = null;
exports.setClient = function (client_) {
    client = client_;
}
exports.onConnect = function () {
    if (!client) return;
    console.log("connection success!");
}

exports.onMessage = function (topic, message) {
    console.log(`${topic}`);
    if (!client) return;
}

exports.onError = function (error) {
    console.log(`mqtt error : ${error}`);
}