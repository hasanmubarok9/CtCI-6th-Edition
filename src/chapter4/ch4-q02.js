'use strict';
const util = require('util');

// import { Tree } from './helpers';

class TreeNode {
  constructor(value) {
    this.val = value;
    this.parent = this.left = this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(value) {
    console.log("di dalam add class Tree, nilai value: ", value);
    let node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
    }
    else {
      let n = this.root,
        branch;
      while (n) {
        console.log("di dalam while, nilai n: ", util.inspect(n, { showHidden: false, depth: 2, colors: true }));
        branch = value < n.val ? 'left' : 'right';
        console.log("di dalam while, nilai branch: ", branch, ", dan nilai n[branch]: ", n[branch]);
        if (!n[branch]) {
          break;
        }
        n = n[branch];
      }
      node.parent = n;
      n[branch] = node;
    }
  }
}

/**
 * As the list is already sorted the best way to create a balanced tree is by
 * adding the middle node (parent) then the children. The algorithm is basically
 * involves adding the middle element of which split of the array so that the
 * parent is added before the left and right children of each subtree.
 *
 * N = |values|
 * Time: O(N lg N)
 * Additional space: O(N)
 */
function makeBalancedTree(values) {
  let tree = new Tree();
  if (values && values.length) {
    add(tree, values, 0, values.length - 1);
  }
  // console.log("akhir makeBalancedTree, nilai tree: ", tree);
  return tree;
}

function add(tree, values, start, end) {
  console.log("di dalam add, nilai start: ", start, "nilai end: ", end);
  if (start === end) {
    tree.add(values[start]);
  }
  else if (start < end) {
    let mid = start + Math.floor((end - start) >> 1);
    console.log("nilai mid: ", mid, "nilai values[mid]: ", values[mid]);
    tree.add(values[mid]);
    console.log("kiri, start: ", start, "mid - 1: ", mid - 1);
    add(tree, values, start, mid - 1);
    console.log("\n");
    console.log("kanan, mid + 1: ", mid + 1, "end: ", end);
    add(tree, values, mid + 1, end);
  }

  // console.log("akhir add, nilai tree: ", tree);
}

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tree = makeBalancedTree(values);
console.log(tree);

