const { Cache_LFU } = require('../index')

let cap = 3
let cache = new Cache_LFU(cap)

let keys = []
let vals = []


if (false) {
    cache.cap = 3

    cache.put(1, 10)
    cache.put("aa", "10")
    cache.put("10", "10")
    cache.put("20", "20")
    cache.put("oooo", "oooo")

    console.log(cache.get(1)) // undefined
    console.log(cache.get("aa")) //undefined

    for (let val of cache.keys) {
        console.log('--111--', val)
    }

    console.log(cache.get("10")) // 10
    console.log(cache.get("10")) // 10
    console.log(cache.get("20")) // 20
    console.log(cache.get("oooo")) // oooo

    cache.put("oooo0", "oooo0")
    console.log(cache.get("20")) // undefined

    for (let val of cache.keys) {
        console.log('--222--', val)
    }


    // cache.put("o", "10")

    // console.log(cache.get("aa")) //null

    // console.log(cache.get("oooo")) //oooo

    // cache.put("oo", "10")

    // console.log(cache.get("10")) //null

    for (let val of cache.keys) {
        console.log('----', val)
    }

} else {
    cache.cap = 50
    let val = Array(100000).fill('lxq').join('-')
    for (let i = 0; i < 10000 * 100000000000000; i++) {
        let key = i
        let time = process.hrtime()[1]
        // let buf = Buffer.from(val)  //这个确实是堆外内存 但是占用太高
        cache.put(key, val)
        for (let j = 0; j < i % 20; j++) {
            cache.get(key)
        }
        console.log(process.hrtime()[1] - time, '--', i)
    }
    cache._testDebug()

}

