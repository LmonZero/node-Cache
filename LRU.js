const Node = require('./structure/Node')
const DoubleList = require('./structure/DoubleList')

class Cache_LRU {
    constructor(cap = 50) {
        this.doubleList = new DoubleList()
        this.map = new Map()
        this.cap = cap
    }

    get(key) {
        if (!this.map.has(key)) {
            return null
        }

        this._makeRecently(key)
        return this.map.get(key).val
    }

    put(key, val) {
        if (this.map.has(key)) {
            this._deleteKey(key)
            this._addRecently(key, val)
            return
        }

        if (this.cap == this.doubleList.size) {
            this._removeLeastRencently()
        }

        this._addRecently(key, val)
    }

    get keys() {
        return this.map.keys()
    }


    //将某个 key 提升为最近使⽤的
    _makeRecently(key) {
        let x = this.map.get(key)
        this.doubleList.remove(x)
        this.doubleList.push(x)
    }

    // 添加最近使⽤的元素
    _addRecently(key, val) {
        let x = new Node(key, val)

        this.doubleList.push(x)

        this.map.set(key, x)
    }

    // 删除某⼀个 key
    _deleteKey(key) {

        x = this.map.get(key)

        this.doubleList.remove(x)

        this.map.delete(key)
    }

    // 删除最久未使⽤的元素
    _removeLeastRencently() {

        let x = this.doubleList.shift()

        this.map.delete(x.key)

    }

}

module.exports = Cache_LRU