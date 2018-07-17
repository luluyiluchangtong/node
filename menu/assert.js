var assert = require("assert");
// 断言一词来自逻辑学，在逻辑学中，断言是 “断定” 一个特定前提为真的陈述，在软件测试中也是类似的含义。
// 测试中 断言语句 的一般形式为assert 表达式，其中的表达式就是逻辑学中的陈述，
// 表达式的值为真(true)的时候该断言才能通过，否则就断言失败
// 测试通过 没有返回值，测试不通过会 报错
// 这里的 断言 相当于 判断真/假，全等/不全等

const obj1 = {
    a: {
        b: 1
    }
};
const obj2 = {
    a: {
        b: 2
    }
};
const obj3 = {
    a: {
        b: 1
    }
};
const obj4 = Object.create(obj1);

assert.deepEqual(obj1, obj1);
assert.deepEqual(obj1, obj2);
// 只测试可枚举的自身属性； 参数可以是任意类型
// assert.equal(actual,expect,[message]) 值的相等  == 
// assert.strictEqual() 值的相等 ===

// deepEqual()是 == 比较
// 只是 deepStrictEqual()是 === 比较； 
// assert.deepStrictEqual() 和 deepEqual() 相似，测试自身属性

// assert.notDeepEqual() 是否不深度相等。。 除此，还有 notEqual()  notDeepStrictEqual()

assert.fail(1, 2, "錯誤信息", ">")
// (actual,expect,[message,oprator,stackStartFunction])
//抛出 AssertionError
assert.ifError(0)
// 如果参数 为真 抛出参数，这里是为 假。则通过。。