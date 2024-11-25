class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const { sortedArray, start, end } = prepareArray(array); // Destructure the object returned from prepareArray
    this.root = this.buildTree(sortedArray, start, end);
  }

  buildTree(array, start, end) {

    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1)
    root.right = this.buildTree(array, mid + 1, end)

    return root;
  }
  
  insert(node, data) {
    if (node === null) {
      return new Node(data);
    }

    if (node.data === data) {
      return node;
    }

    if (data < node.data) {
      node.left = this.insert(node.left, data)
    } else if (data > this.root.data) {
      node.right = this.insert(node.right, data)
    }

    return node;
  }
}

function prepareArray(array) {
  let uniqueArray = [...new Set(array)];
  let sortedArray = uniqueArray.sort((a, b) => a - b);

  return { sortedArray, start: 0, end: sortedArray.length - 1 };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


const tree = new Tree ([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree.insert(tree.root,20);
prettyPrint(tree.root);