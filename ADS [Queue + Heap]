
[ Total_Order relation ]

Keys must be comparable

For a comparable rule ≤:
    > Comparability k1 ≤ k2 or k2 ≤ k1
    > Anti_symmetry if k1 ≤ k2 and k2 ≤ k1, then k1 = k2
    > Transitivity  if k1 ≤ k2 and k2 ≤ k3, then k1 ≤ k3
    > Reflexivity   k ≤ k

if the relation ≤ defines a total order, then k(min) ≤ k

[ Priority Queue ADT ]
public interface Entry<K,V> {
    K getKey();
    V getValue();
}

public interface PriorityQueue<K,V> {
    int size()
    boolean isEmpty()
    Entry<K,V> insert(K key, V value)
    Entry<K,V> min()
    Entry<K,V> removeMin()
}


[ UNSORTED Priority Queue ]

public class UnsortedPriorityQueue<K,V> extends AbstractPriorityQueue<K,V> {
    
    /** primary collection */
    private PositionalList<Entry <K,V>> list = new LinkedPositionalList<>();

    /** constructor */
    public UnsortedPriorityQueue() { super(); }

    /** constructor using this comparator */
    public UnsortedPriorityQueue(Comparator<K> comp) { super(comp); }

    /** return the Position of minimal key Entry */
    private Position<Entry<K,V>> findMin() {
        Position<Entry<K,V>> small = list.first();

        for (Position<Entry<K,V> walk : list.Position()) {
            if (compare(walk.getElement(), small.getElement()) < 0) {
                small = walk;
            }
        }
        return small;
    }

    /** Insert a key-Value and return the entry created */
    public Entry<k,V> insert(K key, V value) {
        checkKey(key);
        Entry<K,V> newest = new PQEntry<>(key, value);
        list.addLast(newest);
        return newest;
    }

    /** return Entry with minimal key */
    public Entry<K,V> min {
        if (list.isEmpty()) return null;
        return findMin().getElement();
    }    

    /** remove and return Entry with minimal key */
    public Entry<K,V> removeMin() {
        if (list.isEmpty()) return null;
        return list.remove(finMin())
    }

    /** return the number if items */
    public int size() { return list.size(); }
}


[ HEAP Diff ]

Heap = complete binary tree ( all level filled up, except the last one)
leftmost is for new Nodes (remaining nodes)

Heap-order: key >= key(parent)

Heap-height: ⌊ log[2](n) ⌋
if complete, num of nodes = 2^h - 1


[ HEAP Linked-tree ]

num_of_nodes = n - 2^h + 1 = n - 2^(⌊log[2](2)⌋) + 1


