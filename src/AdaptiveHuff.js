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
    } else {
      code = (this._NYT.path || '0') + this.defaultCode(c)
      this._NYT.left = new HuffNode(0, this._NYT)
      this._dict[c] = this._NYT.right = new HuffNode(0, this._NYT)
      this._updateTree(c)
      this._NYT = this._NYT.left
    }
    return code
  }

  _updateTree(c) {            // increase weight and swap nodes
    for (let p = this._dict[c]; p; p.weight++, p = p.parent) {
      let leader = this._leaderOfWeight(p.weight)
      ![null, p, p.parent].includes(leader) && HuffCoder._swap(leader, p)
    }
  }

  _leaderOfWeight(w) {
    return (function visit(n) {
      return n ? n.weight === w ? n : visit(n.right) || visit(n.left) : null
    })(this._treeRoot)
  }

  static _swap(leader, p) {
    const temp = p.parent.right           // prevent p and leader are siblings
    leader.parent.right === leader ? leader.parent.right = p : leader.parent.left = p
    temp === p ? p.parent.right = leader : p.parent.left = leader
    leader.parent = [p.parent, p.parent = leader.parent][0]
  }
}
