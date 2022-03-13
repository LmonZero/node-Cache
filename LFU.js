
const DoubleListHash = require('./structure/DoubleListHash')

class Cache_LFU {
    constructor(cap = 50) {
        this.cap = cap
        this.kvfMap = new Map()
        this.fkMpList = new Map()//new DoubleListHash()
        this.minFrq = 1 //记录最小使用次数
    }

    get(key) {
        if (this.kvfMap.has(key)) {
            let val = this.kvfMap.get(key)
            this._kufkMpList(val.frq, ++val.frq, key)
            // val.frq < this.minFrq ? this.minFrq = val.frq : ""
            return val.val
        }
    }

    put(key, val = null) {
        if (this.kvfMap.size >= this.cap) {
            this._removeMinFrqVal() //这个只有在put的时候  之后 minFrq 就为1  ，minFrq 不用管
        }

        if (this.kvfMap.has(key)) {
            //只要更新 val frq  fkMpList
            let val = this.kvfMap.get(key)
            val.val = val

            this._kufkMpList(val.frq, ++val.frq, key)
            // val.frq < this.minFrq ? this.minFrq = val.frq : ""
            return
        }

        this.kvfMap.set(key, { frq: 1, val: val })

        let hashList = this._createfkMpList(1)
        hashList.push(key)

        this.minFrq = 1

    }

    get keys() {
        return this.kvfMap.keys()
    }

    _testDebug() {
        console.log('kvfMap', this.kvfMap.size)
        console.log('fkMpList', this.fkMpList.size)
        console.log('fkMpList', this.fkMpList.keys())
        for (let k of this.fkMpList.keys()) {
            console.log(`fkMpList-${k}`, this.fkMpList.get(k).size)
        }
        // console.log('kvfMap', this.kvfMap.values())
    }



    //删除次数最少的
    _removeMinFrqVal() {
        if (!this.fkMpList.has(this.minFrq)) {
            console.error('its impossible no minFrq hashList')
            return
        }

        let hashList = this.fkMpList.get(this.minFrq)
        let x = hashList.shift()
        // console.log(this.minFrq, x)
        this.kvfMap.delete(x.key)
        this._deleteNullfkMpList(this.minFrq)

    }

    //key 晋升
    _kufkMpList(pre, now, key) {


        let hashListNow = this._createfkMpList(now)
        let hashListPre = this._createfkMpList(pre)

        hashListPre.remove(key)
        let c = this._deleteNullfkMpList(pre)
        if (c && pre == this.minFrq) this.minFrq = now

        hashListNow.push(key)

    }

    //创建 f - hashList (空链表)
    _createfkMpList(f) {

        if (this.fkMpList.has(f)) {
            return this.fkMpList.get(f)
        }

        let hashList = new DoubleListHash()
        this.fkMpList.set(f, hashList)
        return hashList
    }

    //删除 f - hashList (空链表)
    _deleteNullfkMpList(f) {
        if (!this.fkMpList.has(f)) {
            return
        }

        let hashList = this.fkMpList.get(f)

        if (hashList.size != 0) {
            return
        }

        this.fkMpList.delete(f)
        return true
    }



}

module.exports = Cache_LFU