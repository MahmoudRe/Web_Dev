

Diff tree_traversal: way of visiting all nodes of a Tree
    > Depth first traversal
    > Breadth first traversal


[ PRE_ORDER traversal ]

public void preorder (Position<E> p) {
    visit(p);
    for (Position <E> c : children(p)) {
        preorder(c);
    }
}



[ PRE_ORDER traversal v2 ]

public void preorder (Position<E> p) {
    for (Position <E> c : children(p)) {
        preorder(c);
    }
    visit(p)
}


[ Breadth_FIRST traversal ]

public void breadthfirst(Position<E> p) {
    Queue <Position<E>> q = new Queue();
    q.enqueue(p);

    while (!q.isEmpty()) {
        Position<E> p = q.dequeue();
        visit(p);

        for (Position<E> c : children(p)) {
            q.enqueue(c);
        }
    }
}


[ BINARY_TREE and null refrence]

Diff binary_tree: node has at most two children
Diff proper_binary_tree: node does not has one children

public interface BinaryTree<F> extends Tree<E> {
    Position<E> left(Position<E> p) {}
    Position<E> right(Position<E> p) {}
    Position<E> sibling(Position<E> p) {}
}


[ IN_ORDER traversal ]

public void inorder(Position<E> p) {
    if (left(p) != null) inorder(left(p))
    visit(p)

    if (right(p) != null) inorder(right(p))
}



[ LINKED implementation binary_tree ]

public class LinkedBinaryTree<E> implements Tree<E> {
    
    protected static class Node<E> implements Position<E> {
        private E element;
        private Node<E> parent;
        private Node<E> left;
        private Node<E> right;
    }

    protected Node<E> root = null;
} 


[ LINKED implementation tree ] 
    > O(n) space
    > O(1) operations for insertion/removal

public class LinkedTree<E> implements Tree<E> {

    protected static class Node<E> implements Position<E> {
        private E element;
        private Node<E> parent;
        private Array<Node<E>> children;
        // if number of children is fixed => Array
        // otherwise Array_List or Linked_List
    }

    protected Node<E> root = null;
}


[ ARRAY_BASED tree ] 
    > O(2^h) / worstcase: O(2^n) space
    > many update operations require changing the entire Array

-> int max_num_of_nodes: n = 2^(h+1) - 1
-> int min_hiegh: h = log[2](n+1) - 1

[ MAP ADT ]

public interface Map<K,V> {     // <Key,Value>
    int size()
    boolean isEmpty()
    V get (K key)
    V put (K key, V Value)
    V remove (K key)
}


