var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsOnOffNode(config) {
        RED.nodes.createNode(this, config);

        console.log("SmartthingsOnOffNode")
        console.log(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;

        this.updateStatus = function(currentStatus){
            this.currentStatus = currentStatus;
            let msg = {
                topic: "status",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.currentStatus
                }
            };
            this.send(msg);
        }

        if(this.conf && this.device){
            this.conf.registerCallback(this, this.device, (evt) => {
                console.log("OnOffDevice("+this.name+") Callback called");
                console.log(evt);
                if(evt["name"] == "switch"){
                    this.updateStatus((evt["value"].toLowerCase() == "on" ? 1 : 0));
                }
            });

            this.conf.getDeviceStatus(this.device,"main/capabilities/switch").then( (status) => {
                console.log("OnOffDevice("+this.name+") Status Refreshed");

                current = status["switch"]["value"];
                if(current){
                    this.updateStatus((current.toLowerCase() == "on" ? 1 : 0));
                }
            }).catch( err => {
                console.error("Ops... error getting device state");
            });

            this.on('input', msg => {
                console.log("Input Message Received:");
                console.log(msg.payload.value);
                if(msg && msg.payload && msg.payload.value){
                    this.conf.executeDeviceCommand(this.device,[{
                        component: "main",
                        capability: "switch",
                        command: (msg.payload.value == 1 ? "on" : "off")
                    }]).then( (ret) => {
                        this.updateStatus(msg.payload.value);
                    }).catch( (ret) => {
                        console.error("Error updating device");
                    });
                }
            });

            this.on('close', () => {
                console.log("Closed");
            });
        }
    }

    RED.nodes.registerType("smartthings-node-onoff", SmartthingsOnOffNode);

};
