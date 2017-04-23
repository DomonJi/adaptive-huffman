'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encode;

var _AdaptiveHuff = require('./AdaptiveHuff');

var _AdaptiveHuff2 = _interopRequireDefault(_AdaptiveHuff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Domon on 17/4/18.
 */

var fs = require('fs');
function encode(filePath, output) {
  var coder = new _AdaptiveHuff2.default();
  var rs = fs.createReadStream(filePath);
  var ws = fs.createWriteStream(output);
  rs.on('readable', function () {
    var chunk = void 0;
    while (chunk = rs.read(1)) {
      ws.write(coder.encode(chunk.toString()));
    }
  });
}
encode('./static/input.txt', './static/output.txt');