<p align="center">
  <img src="http://pixelartmaker.com/art/b5da8523654c61c.png" width="130px" />
  <h3 align="center">Testing and Benchmarking framework for deno 🧙‍♂️</h3>
</p>

## Merlin

Merlin is a [Jest](https://jestjs.io/en/)-inspired testing framework for deno.

## Using Matchers

### Common Matchers

- `testEqual(label: string, config)`
- `testNotEqual(label: string, config)`
- `evalEquals(testEqual[])`
- `stringContains(label: string, config)`
- `arrayContains(label: string, config)`
- `beNull(label: string, config)`
- `beFalsy(label: string, config)`
- `beTruthy(label: string, config)`

### All Matchers

- `testEqual(label: string, config)`
- `testNotEqual(label: string, config)`
- `evalEquals(testEqual[])`
- `fetchEqual(label: string, config)`
- `arrayContains(label: string, config)`
- `stringContains(label: string, config)`
- `beNull(label: string, config)`
- `beFalsy(label: string, config)`
- `beTruthy(label: string, config)`
- `isBigInt(label: string, config)`
- `isZero(label: string, config)`
- `isNaN(label: string, config)`
- `sameLength(label: string, config)`
- `testRegExp(label: string, config)`
- `isFunction(label: string, config)`
- `isSymbol(label: string, config)`
- `isUndefined(label: string, config)`

### Basic Use

simple assertions.

`example.test.ts`

```typescript
import { Merlin } from "https://deno.land/x/merlin/mod.ts";

const test = new Merlin();

test.testEqual("two plus two is four", {
  expect() {
    return 2 + 2;
  },
  toBe() {
    return 4;
  },
});
```

run this test in deno

```sh
$ deno test
```

you should see this output on the console.

```sh
running 1 tests
test two plus two is four ... ok (17ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (18ms)
```

### Parameters

all assertions have parameters that they can receive, these parameters can change the behavior of the tests.

- `label` add a description to the test.
- `expect()` this function returns the data and then tests with its matchmaker.
- `toBe()` this function returns the data that we hope is correct.
- `notBe()` this function returns the data that we hope it is incorrect.
- `value()` returns the data expected to be of that type.
- `ignore (optional)` receives a boolean to ignore the test in case the value is true.
- `strict (optional)` receives a boolean, it does a strict comparison of the `expect()` and `toBe()` values.
- `message (optional)` receives a string with the message to display in case the test fails.
- `Ops (optional)` receives a boolean, closes all the operations that never end, for example `Deno.open("file.txt")`. by default is `true`.
- `Resources (optional)` receives a boolean, terminates all asynchronous processes that interact with the system. by default is `true`.
- `only (optional)` receives a boolean, only tests that have `only in true` will be executed, the rest will not run.

### Multiple tests

`example.test.ts`

```typescript
test.evalEquals([
  {
    label: "object assignment",
    expect() {
      const data: any = { one: 1 };
      data["two"] = 2;

      return data;
    },
    toBe() {
      return { one: 1, two: 2 };
    },
  },
  {
    label: "two plus two is four",
    expect() {
      return 2 + 2;
    },
    toBe() {
      return 4;
    },
  },
]);
```

output

```sh
$ deno test

running 2 tests
test object assignment ... ok (10ms)
test two plus two is four ... ok (1ms)

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (13ms)
```

### notEqual

`example.test.ts`

```typescript
test.testNotEqual("two plus two not is five", {
  expect() {
    return 2 + 2;
  },
  notBe() {
    return 4;
  },
});
```

output

```sh
$ deno test

running 1 tests
test two plus two not is five ... FAILED (2ms)

failures:

two plus two not is five
AssertionError: actual: 4 expected: 4
    at assertNotEquals (https://deno.land/std/testing/asserts.ts:195:5)
    at fn (merlin.ts:105:9)
    at async asyncOpSanitizer ($deno$/testing.ts:34:5)
    at async Object.resourceSanitizer [as fn] ($deno$/testing.ts:68:5)
    at async TestRunner.[Symbol.asyncIterator] ($deno$/testing.ts:276:11)
    at async Object.runTests ($deno$/testing.ts:364:20)

failures:

        two plus two not is five

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out (2ms)
```
