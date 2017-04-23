/**
 * Created by Domon on 17/4/18.
 */

import fs from 'fs'
import HuffCoder from './AdaptiveHuff'

const coder = new HuffCoder()
const rs = fs.createReadStream('./static/input.txt')
const ws = fs.createWriteStream('./static/output.txt')
rs.on('readable', function () {
  let chunk
  while (chunk = rs.read(1)) {
    ws.write(coder.encode(chunk.toString()))
  }
})
