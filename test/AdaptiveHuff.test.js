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
    assert(huffCoder.loopUp(Symbol.for('NEW')) === '0')
    huffCoder.receiveChar('a')
    huffCoder.receiveChar('a')
    huffCoder.receiveChar(Symbol.for('NEW'))
    huffCoder.receiveChar('d')
    huffCoder.receiveChar(Symbol.for('NEW'))
    huffCoder.receiveChar('c')
    assert(huffCoder.loopUp('c') === '001')
    assert(huffCoder.loopUp('d') === '01')
    huffCoder.receiveChar('c')
    // assert(huffCoder.loopUp('a') === '0')
    assert(huffCoder._treeRoot.right.weight === huffCoder._treeRoot.left.weight + 1)
    assert(huffCoder.loopUp('d') === '101')
    assert(huffCoder.loopUp('c') === '11')
    assert(huffCoder.loopUp(Symbol.for('NEW')) === '100')
  })
})
