/**
 * Created by Domon on 17/4/20.
 */

import HuffCoder from '../src/AdaptiveHuff'
import assert from 'power-assert'

describe('HuffCoder', function () {
  it('receive char', function () {
    let huffCoder = new HuffCoder()
    huffCoder.receiveChar('æ')
    huffCoder.receiveChar('a')
    assert(huffCoder.loopUp('a') === 1)
  })
})
