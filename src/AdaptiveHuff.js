/**
 * Created by Domon on 17/4/18.
 */

class HuffNode {
  constructor(weight = 0, parent) {
    this.weight = weight
    this.parent = parent
    this.right = this.left = null
  }

  get path() {
    return this.parent ? this.parent.path + (this.parent.right === this ? '1' : '0') : ''
  }
}

export default class HuffCoder {
  constructor(defaultCode) {
    this._NYT = this._treeRoot = new HuffNode()
    this._dict = {}
    this.defaultCode = defaultCode || (c => {
        let code = Array.from({length: 16}, _ => 0).join('') + c.charCodeAt().toString(2)
        return code.substr(code.length - 16)
      })
  }

  encode(c) {
    if (this._dict[c]) {
      var code = this._dict[c].path
      this._updateTree(c)
    }
    else {
      code = (this._NYT.path || '0') + this.defaultCode(c)
      this._NYT.left = new HuffNode(0, this._NYT)
      this._dict[c] = this._NYT.right = new HuffNode(0, this._NYT)
      this._updateTree(c)
      this._NYT = this._NYT.left
    }
    return code
  }

  // increase weight and swap nodes
  _updateTree(c) {
    let cur = this._dict[c]
    while (cur) {
      let rightmost = this._rightmostOfWeight(cur.weight)
      ![null,cur,cur.parent].includes(rightmost) && HuffCoder._swap(rightmost,cur)
      cur.weight++ && (cur = cur.parent)
    }
  }

  _rightmostOfWeight(w) {
    return (function visit(node) {
      if (!node) return null
      if (node.weight === w) return node
      return visit(node.right) || visit(node.left)
    })(this._treeRoot)
  }

  static _swap(row, cur) {
    if (row.parent === cur.parent) {
      cur.parent.right = cur
      cur.parent.left = row
      return
    }
    row.parent.right === row ? row.parent.right = cur : row.parent.left = cur
    cur.parent.right === cur ? cur.parent.right = row : cur.parent.left = row
    row.parent = [cur.parent, cur.parent = row.parent][0]
  }
}
