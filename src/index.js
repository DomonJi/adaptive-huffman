/**
 * Created by Domon on 17/4/18.
 */

var fs = require('fs')
import HuffCoder from './AdaptiveHuff'
export default function encode(filePath,output) {
  const coder = new HuffCoder()
  const rs = fs.createReadStream(filePath)
  const ws = fs.createWriteStream(output)
  rs.on('readable',function () {
    let chunk
    while (chunk=rs.read(1)){
      ws.write(coder.encode(chunk.toString()))
    }
  })
}
encode('./static/input.txt','./static/output.txt')
