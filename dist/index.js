'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _AdaptiveHuff = require('./AdaptiveHuff');

var _AdaptiveHuff2 = _interopRequireDefault(_AdaptiveHuff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Domon on 17/4/18.
 */

var coder = new _AdaptiveHuff2.default();
var rs = _fs2.default.createReadStream('./static/input.txt');
var ws = _fs2.default.createWriteStream('./static/output.txt');
rs.on('readable', function () {
  var chunk = void 0;
  while (chunk = rs.read(1)) {
    ws.write(coder.encode(chunk.toString()));
  }
});