var assert = require("assert");
// 断言一词来自逻辑学，在逻辑学中，断言是 “断定” 一个 特定前提为真 的陈述，在软件测试中也是类似的含义。
// 测试中 断言语句 的一般形式为 assert 表达式，其中的表达式就是逻辑学中的陈述，
// 表达式的值为真(true)的时候该断言才能通过，否则就断言失败
// 测试通过 没有返回值，测试不通过会 报错
// 这里的 断言 相当于 判断真/假，全等/不全等

// Error的子类 assert.AssertionError类， 表明断言的失败


const { // 生成 assert.AssertionError类 的实例，用于比较错误信息
    message
} = new assert.AssertionError({
    actual: 1,
    expected: 2,
    operator: 'strictEqual'
})

try {
    assert.strictEqual(1, 2);
} catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
}

// assert(value,message)
// assert.strictEqual(actual,expected,message)  / assert.notStrictEqual(actual,expected,message)
// assert.deepStrictEqual(actual, expected[, message])  / assert.notDeepStrictEqual(actual,expected,message)

// assert.ok(value,message)
// assert.fail(message)
// assert.ifError(value)

// assert.reject(block,error,message) / assert.doesNotReject(block[, error][, message])
// assert.throw(block,error,message) / assert.doesNotThrow(block[, error][, message])