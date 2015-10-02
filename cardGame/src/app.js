'use strict';

require('./app.css');

var utils = require('./utils');

var Manager = function(element, options) {
    this._init(element, options);
};


var m = Manager.prototype ;

utils.extend(m,require('./instance/init'));
utils.extend(m,require('./instance/layout'));
utils.extend(m,require('./instance/event'));
utils.extend(m,require('./instance/trigger'));
utils.extend(m,require('./instance/animrelated'));

 
window['CardGames'] = Manager;
module.exports = Manager