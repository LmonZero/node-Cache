
/**
 * @param any key
 * @param any val
*/
class Node {
    constructor(key, val) {
        this.key = key
        this.val = val
        this.prev = null
        this.next = null
    }
}

module.exports = Node