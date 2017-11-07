
const options = require('./options');

const Scout = require('zetta-scout');
const bme280 = require('./bme280');
const util = require('util');

const Bme280Scout = module.exports = function(opts) {
    
  // see if any of the options were overridden in the server

  if (typeof opts !== 'undefined') {
    // copy all options defined in the server
    for (const key in opts) {
      if (typeof opts[key] !== 'undefined') {
        options[key] = opts[key];
      }
    }
  }

  if (options.name == 'undefined') { options.name = "BME280" }
  this.name = options.name;
    
  this.Bme280 = new bme280(options);

  Scout.call(this);
};

util.inherits(Bme280Scout, Scout);

Bme280Scout.prototype.init = function(next) {

  const query = this.server.where({name: this.name});
  
  const self = this;
  this.server.find(query, function(err, results) {
    if (!err) {
      if (results[0]) {
        self.provision(results[0], self.bme280);
        self.server.info('Provisioned known device ' + self.name);
      } else {
        self.discover(self.bme280);
        self.server.info('Discovered new device ' + self.name);
      }
    }
    else {
      self.server.error(err);
    }
  });


  next();

};
