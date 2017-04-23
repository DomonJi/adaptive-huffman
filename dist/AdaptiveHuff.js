'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Domon on 17/4/18.
 */

var HuffNode = function () {
  function HuffNode() {
    var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var parent = arguments[1];

    _classCallCheck(this, HuffNode);

    this.weight = weight;
    this.parent = parent;
    this.right = this.left = null;
  }

  _createClass(HuffNode, [{
    key: 'path',
    get: function get() {
      return this.parent ? this.parent.path + (this.parent.right === this ? '1' : '0') : '';
    }
  }]);

  return HuffNode;
}();

var HuffCoder = function () {
  function HuffCoder(defaultCode) {
    _classCallCheck(this, HuffCoder);

    this._NYT = this._root = new HuffNode();
    this._dict = {};
    this.defaultCode = defaultCode || function (c) {
      var code = Array.from({ length: 8 }, function (_) {
        return 0;
      }).join('') + c.charCodeAt().toString(2);
      return code.substr(code.length - 8);
    };
  }

  _createClass(HuffCoder, [{
    key: 'encode',
    value: function encode(c) {
      if (this._dict[c]) {
        var code = this._dict[c].path;
        this._updateTree(c);
      } else {
        code = (this._NYT.path || '0') + this.defaultCode(c);
        this._NYT.left = new HuffNode(0, this._NYT);
        this._dict[c] = this._NYT.right = new HuffNode(0, this._NYT);
        this._updateTree(c);
        this._NYT = this._NYT.left;
      }
      return code;
    }
  }, {
    key: '_updateTree',
    value: function _updateTree(c) {
      // increase weight and swap nodes
      for (var p = this._dict[c]; p; p.weight++, p = p.parent) {
        var leader = this._leaderOfWeight(p.weight);
        ![p, p.parent, undefined].includes(leader) && HuffCoder._swap(leader, p);
      }
    }
  }, {
    key: '_leaderOfWeight',
    value: function _leaderOfWeight(w) {
      for (var q = [this._root], p; p = q.shift(); p.left && q.push(p.right, p.left)) {
        if (p.weight === w) return p;
      }
    }
  }], [{
    key: '_swap',
    value: function _swap(leader, p) {
      var temp = p.parent.right; // prevent p and leader are siblings
      leader.parent.right === leader ? leader.parent.right = p : leader.parent.left = p;
      temp === p ? p.parent.right = leader : p.parent.left = leader;
      leader.parent = [p.parent, p.parent = leader.parent][0];
    }
  }]);

  return HuffCoder;
}();

exports.default = HuffCoder;