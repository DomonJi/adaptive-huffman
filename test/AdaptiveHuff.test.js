/**
 * Created by Domon on 17/4/20.
 */

import HuffCoder from '../src/AdaptiveHuff'
import assert from 'power-assert'

describe('HuffCoder', function () {
  it('encode', function () {
    let huffCoder = new HuffCoder()
    huffCoder.encode('A')
    huffCoder.encode('A')
    huffCoder.encode('D')
    huffCoder.encode('C')
    assert(huffCoder.encode('C') === '001')
    assert(huffCoder.encode('D') === '101')
    huffCoder.encode('D')
    assert(huffCoder.encode('D') === '0')
  })
})
