const { Cache_LRU } = require('../index')

let cap = 100
let cache = new Cache_LRU(cap)

let keys = []
let vals = []


if (false) {

    cache.put(1, 10)
    cache.put("aa", "10")
    cache.put("10", "10")
    cache.put("20", "20")
    cache.put("oooo", "oooo")

    console.log(cache.get(1)) //10

    cache.put("o", "10")

    console.log(cache.get("aa")) //null

    console.log(cache.get("oooo")) //oooo

    cache.put("oo", "10")

    console.log(cache.get("10")) //null

    for (let val of cache.keys) {
        console.log(val)
    }

} else {


    let val = Array(10000).fill('lxq').join('-')
    for (let i = 0; i < 10000 * 10000000000; i++) {
        let key = 'lxq' + i
        let time = process.hrtime()[1]
        // let buf = Buffer.from(val)  //这个确实是堆外内存 但是占用太高
        cache.put(key, val)
        for (let j = 0; j < i % 20; j++) {
            cache.get(key)
        }
        console.log(process.hrtime()[1] - time, '--', i)
    }


    for (let val of cache.keys) {
        console.log(val)
        break
    }
}

