/**
 * Created by Domon on 17/4/18.
 */

function HuffNode(weight, parent, path) {
  this.weight = weight
  this.parent = parent
  this.left = null
  this.right = null
  this.path = path
}

class HuffNode {
  constructor(weight, parent, isRight) {
    this.weight = weight
    this.parent = parent
    this.left = null
    this.right = null
    this.isRight = isRight
  }

  get path() {
    return this.parent ? this.parent.path + this.parent.right === this ? '1' : '0' : ''
  }
}

export default class HuffCoder {
  constructor() {
    this.treeRoot = new HuffNode(0)
    this.NYT = this.treeRoot
    this.nextNew = false
    this.dict = {}
  }

  receiveCode(c) {
    if (c === this.getPath(this.NYT)) {
      this.NYT.left = new HuffNode(0, this.NYT)
      this.nextNew = true
    }
    if (this.nextNew) {
      this.NYT.right = new HuffNode(0, this.NYT)
      this.updateTree(c)
      this.NYT = this.NYT.left
      this.nextNew = false
    } else {
      this.updateTree(c)
    }
  }

  // increase weight and swap nodes
  updateTree(c) {
    let current
    if (this.nextNew) {
      current = this.NYT.right
      this.dict[c] = this.NYT.path + 1
    } else {
      current = this.findNodeByPath(this.dict[c])
    }
    while (current.parent) {
      let lastNodeOfN = this.findLastNodeOfWeight(current.weight++)
      lastNodeOfN && this.swap(lastNodeOfN, current)
      current.parent.weight++ && (current = current.parent)
    }
  }

  findNodeByPath(path) {
    let res = this.treeRoot
    path.forEach(i => res = i === 0 ? res.left : res.right)
    return res
  }

  updateDict(node) {

  }

  findLastNodeOfWeight(n) {

  }

  swap(node1, node2) {

  }

  getPath(node) {

  }
}
