/**
 * Created by Domon on 17/4/18.
 */

class HuffNode {
  constructor(weight, parent) {
    this.weight = weight
    this.parent = parent
    this.left = null
    this.right = null
  }

  get path() {
    return this.parent ? this.parent.path + this.parent.right === this ? '1' : '0' : ''
  }
}

export default class HuffCoder {
  constructor(charForNew = 'æ', defaultRule) {
    this._treeRoot = new HuffNode(0)
    this._NYT = this._treeRoot
    this._nextNew = false
    this._dict = {}
    this._dict[charForNew] = this._NYT
    this.defaultRule = defaultRule || (c => {
        let code = Array.from({length: 16}, () => 0).join('') + c.toString().charCodeAt().toString(2)
        return code.substr(code.length - 16)
      })
  }

  loopUp(char) {
    return this._dict[char].path || this.defaultRule(char)
  }

  receiveChar(char) {
    if (this._dict[char] === this._NYT) {
      this._nextNew && throwError('Duplicated NEW signal')
      this._NYT.left = new HuffNode(0, this._NYT)
      this._nextNew = true
    }
    if (this._nextNew) {
      this._NYT.right = new HuffNode(0, this._NYT)
      this._updateTree(char)
      this._NYT = this._NYT.left
      this._nextNew = false
    } else {
      this._updateTree(char)
    }
  }

  // increase weight and _swap nodes
  _updateTree(c) {
    let current
    if (this._nextNew) {
      current = this._NYT.right
      this._dict[c] = this._NYT.right
    } else {
      current = this._dict[c]
    }
    while (current.parent) {
      let lastNodeOfN = this._findLastNodeOfWeight(current.weight++)
      lastNodeOfN && HuffCoder._swap(lastNodeOfN, current)
      current.parent.weight++ && (current = current.parent)
    }
  }

  _findLastNodeOfWeight(n) {
    function visit(node) {
      if (!node) return null
      if (node.weight === n) return node
      return visit(node.right) || visit(node.left)
    }

    return visit(this._treeRoot)
  }

  static _swap(node1, node2) {
    node1.parent.right === node1 ? node1.parent.right = node2 : node1.parent.left = node2
    node2.parent.right === node2 ? node2.parent.right = node1 : node2.parent.left = node1
    const temp = node1.parent
    node1.parent = node2.parent
    node2.parent = temp
  }
}
