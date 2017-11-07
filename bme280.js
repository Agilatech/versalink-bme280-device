
const VersalinkDevice = require('@agilatech/versalink-device');
const device = require('@agilatech/bme280');

module.exports = class Bme280 extends VersalinkDevice {
    
    constructor(config) {
        
        // The bus/file must be defined. If not supplied in config, then default to i2c-2
        const bus  = config['bus'] || "/dev/i2c-2";
        const altitude = (typeof config['altitude'] != 'undefined') ? config['altitude'] : 5;
        
        const hardware = new device.Bme280(bus, altitude);
        
        super(hardware, config);
        
    }
    
}

