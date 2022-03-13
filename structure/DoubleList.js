const Node = require('./Node')

class DoubleList {
    constructor() {
        this.head = new Node(0, 0)
        this.tail = new Node(0, 0)
        this.head.next = this.tail
        this.tail.prev = this.head
        this.size = 0
    }

    // 在链表尾部添加节点 x，时间 O(1)
    push(Node) {
        Node.prev = this.tail.prev
        Node.next = this.tail
        this.tail.prev.next = Node
        this.tail.prev = Node
        this.size++
    }
    // 删除链表中的 x 节点（x ⼀定存在）
    // 由于是双链表且给的是⽬标 Node 节点，时间 O(1)
    remove(Node) {

        Node.prev.next = Node.next
        Node.next.prev = Node.prev

        Node.prev = null
        Node.next = null

        this.size--
    }

    // 删除链表中第⼀个节点，并返回该节点，时间 O(1)
    shift() {
        let node = this.head.next
        if (node != this.tail) {

            this.remove(node)

            return node

        } else {
            return null
        }
    }

    // 删除链表中最后⼀个节点，并返回该节点，时间 O(1)

    pop() {
        let node = this.tail.prev
        if (node != this.head) {

            this.remove(node)

            return node

        } else {
            return null
        }
    }


}

module.exports = DoubleList