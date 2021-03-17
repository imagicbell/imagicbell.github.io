---
title:  "Algorithm Notes: Traversal of Binary Tree"
date:   "2020-10-07T16:00:00+08:00"
categories: Algorithm
---



Mostly we know that the traversal of binary tree can be easily done by recursion.

#### Preorder

```javascript
let result = [];
function preorder(root) {
  if (!root)
    return;
  
	result.push(root.val);
  preorder(root.left);
  preorder(root.right);
}
```

#### Inorder

```javascript
let result = [];
function inorder(root) {
  if (!root)
    return;
  
  inorder(root.left);
  result.push(root.val);
  inorder(root.right);
}
```

#### Postorder

```javascript
let result = [];
function postorder(root) {
  if (!root)
    return;
  
  postorder(root.left);
  postorder(root.right);
  result.push(root.val);
}
```

#### Levelorder

```javascript
let result = [];
function levelorder(root) {
  let helper = nodes => {
    let levelResult = [];
    let newNodes = [];
    nodes.forEach(node => {
      if (node) {
        levelResult.push(node.val);
        newNodes.push(node.left);
        newNodes.push(node.right);
      }
    });
    result.push(levelResult);
    helper(newNodes);
  }
  
  helper([root]);
}	
```



The recursive traversal is quite straightforward and easily understood. However, we can also traverse the binary tree in an iterative way, which utilizes the stack.

#### Preorder

The iteratice preorder traversal is the easiest, because it visits the parent node first, then the left tree, and then the right tree. So we push the right node into the stack first.

```javascript
function preorder(root) {
  let result = [];
  let stack = [root];
  while (stack.length > 0) {
      let node = stack.pop();
      if (node) {
          result.push(node.val);
          stack.push(node.right);
          stack.push(node.left);    
      }      
  }
  return result;
}
```

#### Inorder

The iterative inorder traversal is a little more difficult. As we should traverse the leftmost child node first, so we iterate the left child util reaching the leaf. After that, we get the top node from the stack, which is the current needed node, and then push its right child into the stack. Then repeat.

```javascript
function inorder(root) {
  let current = root;
  let stack = [];
  let results = [];
  while (current || stack.length > 0) {
    while(current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    results.push(current.val);
    current = current.right;
  }
  return results;
}
```

#### Postorder

The iterative postorder traversal is much more difficult for understanding and remembering. But there is a smart solution.

1. Consider the preorder traversal: **root -> left -> right**.
2. Then mirror the preorder traversal: **root -> right -> left**.
3. Then reverse the mirror of the preorder traversal: **left -> right -> root**,  which is exactly the postorder traversal.

```javascript
function postorder(root) {
  let stack = [root];
  let result = [];
  while (stack.length > 0) {
      let node = stack.pop();
      if (node) {
          result.unshift(node.val);
          stack.push(node.left);
          stack.push(node.right);
      }
  }
  return result;
}
```

#### Levelorder

The iterative levelorder traversal is quite straightforward, which is just how the BFS does using Queue.

```javascript
function levelorder(root) {
  let result = [];
  let curQueue = [root];
  while (curQueue.length > 0) {
      let tempQueue = [];
      let levelResult = [];
      curQueue.forEach(node => {
         if (node) {
             levelResult.push(node.val);
             tempQueue.push(node.left);
             tempQueue.push(node.right);
         } 
      });
      curQueue = tempQueue;
      if (levelResult.length > 0)
          result.push(levelResult);
  }
  return result;
}
```



### Usage

So why use the iterative traversal. When do we need to convert recursion to iteration.

1. Recursive function call consumes additional memory on system stack, which may lead to stackoverflow. 
2. Iteration is more controllable. Think of implementing a iterator for the binary tree in whatever order. We can just **yield** the node in the iteration loop, or we can utilize the stack and control the returned node each time.

In conclusion, iteration is an very efficient way to traverse the binary tree, although it is not that intuitive as the recursion does. However, we can keep in mind of an alternative solution.