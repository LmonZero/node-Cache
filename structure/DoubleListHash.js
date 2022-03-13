const DoubleList = require('./DoubleList')
const Node = require('./Node')

/**
 * @description 哈希链表  -有序且能快速查找
 * 
*/

class DoubleListHash {
    constructor() {
        this.map = new Map()
        this.DoubleList = new DoubleList()
    }

    // get(key) {
    //     if (this.map.has(key)) {
    //         let x = this.map.get(key)
    //         return x.val
    //     }
    //     return null
    // }


    push(key, val) {
        let x = new Node(key, val)
        this.DoubleList.push(x)
        this.map.set(key, x)
        // console.log('pusht111-', x.key)
    }


    shift() {
        let x = this.DoubleList.shift()
        if (x) {
            this.map.delete(x.key)
            // console.log('shift111-', x.key)
            return x
        } else {
            return null
        }
    }

    pop() {
        let x = this.DoubleList.pop()
        if (x) {
            this.map.delete(x.key)
            // console.log('pop111-', x.key)
            return x
        } else {
            return null
        }
    }

    remove(key) {

        if (this.map.has(key)) {
            let x = this.map.get(key)
            this.DoubleList.remove(x)
            this.map.delete(key)
        }/*  else {
            console.log("????")
            process.exit()
        } */
    }

    get size() {
        return this.DoubleList.size
    }

}

module.exports = DoubleListHash