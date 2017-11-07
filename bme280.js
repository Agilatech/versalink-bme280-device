
const VersalinkDevice = require('@agilatech/versalink-device');
const device = require('@agilatech/bme280');

module.exports = class Bme280 extends VersalinkDevice {
    
    constructor(options) {
        
        // The bus/file must be defined. If not supplied in options, then default to i2c-2
        const bus  = options['bus'] || "/dev/i2c-2";
        
        const hardware = new device.Bme280(bus, altitude);
        
        super(hardware, options);
        
    }
    
}

