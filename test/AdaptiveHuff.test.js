/**
 * Created by Domon on 17/4/20.
 */

import HuffCoder from '../src/AdaptiveHuff'
import assert from 'power-assert'

describe('HuffCoder', function () {
  it('receive char', function () {
    let huffCoder = new HuffCoder()
    assert(huffCoder.loopUp('a') === '0000000001100001')
    huffCoder.receiveChar(Symbol.for('NEW'))
    huffCoder.receiveChar('a')
    huffCoder.receiveChar('a')
    huffCoder.receiveChar(Symbol.for('NEW'))
    huffCoder.receiveChar('d')
    assert(huffCoder.loopUp('a') === '1')
    assert(huffCoder.loopUp('d') === '01')
  })
})
