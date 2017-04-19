/**
 * Created by Domon on 17/4/18.
 */
import fs from 'fs'
import HuffCoder from './AdaptiveHuff'
export default function (input, output, mode = 'encode') {
  const fileSize = fs.statSync(input).size
  const infd = fs.openSync(input, 'r')
  const outfd = fs.openSync(output, 'w')
  const huff = new HuffCoder()
  let buff = new Buffer(1024 * 6)
  let bytesRead = 0
  let chunkSize = 0
  while ((chunkSize = fs.readFileSync(infc, buff, 0, 1024 * 6)) > 0) {
    // huff.update(buff,chunkSize)
    bytesRead += chunkSize
  }
  // huff.flush
  fs.closeSync(infd)
  fs.closeSync(outfd)
}
