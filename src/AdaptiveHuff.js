/**
 * Created by Domon on 17/4/18.
 */

class HuffNode {
  constructor(weight = 0, parent) {
    this.weight = weight
    this.parent = parent
    this.left = null
    this.right = null
  }

  get path() {
    return this.parent ? this.parent.path + (this.parent.right === this ? '1' : '0') : ''
  }
}

export default class HuffCoder {
  constructor(defaultRule) {
    this._treeRoot = new HuffNode(0)
    this._NYT = this._treeRoot
    this._receivingNew = false
    this._dict = {}
    this._dict[Symbol.for('NEW')] = this._NYT
    this.defaultRule = defaultRule || (c => {
        if (c === Symbol.for('NEW')) return '0'
        let code = Array.from({length: 16}, () => 0).join('') + c.toString().charCodeAt().toString(2)
        return code.substr(code.length - 16)
      })
  }

  loopUp(char) {
    return this._dict[char] && this._dict[char].path || this.defaultRule(char)
  }

  receiveChar(char) {
    if (char === Symbol.for('NEW')) {
      this._NYT.left = new HuffNode(0, this._NYT)
      this._receivingNew = true
    }
    else if (this._receivingNew) {
      this._dict[char] = this._NYT.right = new HuffNode(0, this._NYT)
      this._updateTree(char)
      this._dict[Symbol.for('NEW')] = this._NYT = this._NYT.left
      this._receivingNew = false
    } else this._updateTree(char)
  }

  // increase weight and _swap nodes
  _updateTree(c) {
    let current = this._dict[c]
    while (current) {
      let lastNodeOfN = this._findLastNodeOfWeight(current.weight)
      if (lastNodeOfN && lastNodeOfN !== current && lastNodeOfN !== current.parent)
        HuffCoder._swap(lastNodeOfN, current)
      current.weight++
      current = current.parent
    }
  }

  _findLastNodeOfWeight(n) {
    return (function visit(node) {
      if (!node) return null
      if (node.weight === n) return node
      return visit(node.right) || visit(node.left)
    })(this._treeRoot)
  }

  static _swap(lastOfN, current) {
    if (lastOfN.parent === current.parent) {
      current.parent.right = current
      current.parent.left = lastOfN
      return
    }
    lastOfN.parent.right === lastOfN ? lastOfN.parent.right = current : lastOfN.parent.left = current
    current.parent.right === current ? current.parent.right = lastOfN : current.parent.left = lastOfN
    const temp = lastOfN.parent
    lastOfN.parent = current.parent
    current.parent = temp
  }
}
