/**
 * Created by Domon on 17/4/20.
 */

import HuffCoder from '../src/AdaptiveHuff'
import assert from 'power-assert'

describe('HuffCoder', function () {
  it('receive char', function () {
    let huffCoder = new HuffCoder()
    huffCoder.receiveChar(Symbol.for('NEW'))
    huffCoder.receiveChar('a')
    huffCoder.receiveChar('a')
    huffCoder.receiveChar(Symbol.for('NEW'))
    huffCoder.receiveChar('d')
    console.log(huffCoder._treeRoot.path)
    console.log(huffCoder._treeRoot.left.path)
    assert(huffCoder.loopUp('a') === '1')
    assert(huffCoder.loopUp('d') === '01')
  })
})
