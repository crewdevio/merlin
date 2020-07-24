<p align="center">
  <img src="http://pixelartmaker.com/art/b5da8523654c61c.png" width="130px" />
  <h3 align="center">Testing and Benchmarking framework for deno 🧙‍♂️</h3>
</p>
<p align="center">
   <a href="https://github.com/crewdevio/merlin/issues">
     <img alt="GitHub issues" src="https://img.shields.io/github/issues/crewdevio/merlin">
   </a>
   <a href="https://github.com/crewdevio/merlin/network">
     <img alt="GitHub forks" src="https://img.shields.io/github/forks/crewdevio/merlin">
   </a>
   <a href="https://github.com/crewdevio/merlin/stargazers">
     <img alt="GitHub stars" src="https://img.shields.io/github/stars/crewdevio/merlin">
   </a>
   <a href="https://github.com/crewdevio/merlin/blob/master/LICENSE">
     <img alt="GitHub license" src="https://img.shields.io/github/license/crewdevio/merlin">
   </a>
   <a href="https://deno.land">
     <img src="https://img.shields.io/badge/deno-%5E1.2.0-green?logo=deno"/>
   </a>
   <a href="https://nest.land/package/merlin">
     <img src="https://nest.land/badge.svg" />
   </a>
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

- `testEqual(label: string, config)` Compare two values and throws an error if the expect and toBe are not equal
- `testNotEqual(label: string, config)` Compare two values and throws an error if the expect and notBe are equal
- `evalEquals(testEqual[])` evaluate multiple equality tests in an array. If the data is not the same it throws an error
- `fetchEqual(label: string, config)` evaluate if two values are equal. If the request data is not the same as expected, it throws an error
- `arrayContains(label: string, config)` evaluates that the array contains an especific data. if the array does not contain the data it throws an error
- `stringContains(label: string, config)` evaluates if a string contains an especific word. if the string does not contain the word it throws an error
- `beNull(label: string, config)` evaluates if a data is null
- `beFalsy(label: string, config)` evaluates if a data is a falsy value
- `beTruthy(label: string, config)` evaluates if a data is a truthy value
- `isBigInt(label: string, config)` evaluates if a data is a bigInt value type
- `isZero(label: string, config)` evaluates if a data is a Zero
- `isNaN(label: string, config)` evaluates if a data is NaN value
- `sameLength(label: string, config)` evaluates if data has a especific length
- `testRegExp(label: string, config)` evaluates if a regular expression match
- `isFunction(label: string, config)` evaluates if a data is a function
- `isSymbol(label: string, config)` evaluates if a data is a symbol
- `isUndefined(label: string, config)` evaluates if a data is undefined
- `testSame(label: string, config)` evaluates if two values are strictly the same
- `testGreaterOrEqual(label: string, config)` evaluates whether the expected data is greater than or equal to another
- `testGreater(label: string, config)` evaluates whether the expected data is greater than another
- `testLess(label: string, config)` evaluates if the expected data is less than another
- `testLessOrEqual(label: string, config)` evaluates if the expected data is less than or equal to another
- `testInstanceOf(label: string, config)` evaluates that one object is an instance of another
- `testFloat(label: string, config)` evaluates if two decimal numbers are equal

### Install Merlin

install merlin-cli (optional)

```sh
$ deno install --allow-run -n merlin http://denopkg.com/crewdevio/merlin/cli.ts
```

or using [Trex](https://github.com/crewdevio/Trex) package manager.

```sh
$ trex getTool merlin-cli
```

### Mirrors

you can get Merlin from different url.

- from `deno.land/x`

```typescript
import { Merlin } from "https://deno.land/x/merlin/mod.ts";
```

- from `nest.land`

```typescript
import { Merlin } from "https://x.nest.land/merlin@1.0.0/mod.ts";
```

- from `github repo`

```typescript
import { Merlin } from "http://denopkg.com/crewdevio/merlin/mod.ts";
```

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

### about resources and ops sanitizers

Certain actions in Deno create resources in the resource table . These resources should be closed after you are done using them.

For each test definition, the test runner checks that all resources created in this test have been closed. This is to prevent resource 'leaks'. This is enabled by default for all tests, but can be disabled by setting the sanitizeResources boolean to false in the test definition.

The same is true for async operation like interacting with the filesystem. The test runner checks that each operation you start in the test is completed before the end of the test. This is enabled by default for all tests, but can be disabled by setting the sanitizeOps boolean to false in the test definition.

```typescript
async function writeSomething(): Promise<string> {
  const decoder = new TextDecoder("utf-8");
  Deno.createSync("./texts.txt");
  const Package = await Deno.readFileSync("./text.txt");
  await Deno.writeTextFile("./text.txt", "test");
  return decoder.decode(Package);
}

test.testEqual("Leak resources test", {
  expect: async () => await writeSomething(),
  toBe: () => "test",
  only: true,
  Ops: false,
  Resources: false,
});
```

```sh
deno test

test Leak resources test ... ok (5ms)

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

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

## stringContains

`example.test.ts`

```typescript
test.stringContains("hello world contains orld", {
  Contains: () => "orld",
  value: () => "Hello World",
});
```

```sh
deno test

test hello world contains orld ... ok (8ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

### fetchEqual

```typescript
test.fetchEqual("fetch data", {
  url: "https://jsonplaceholder.typicode.com/todos/1",
  type: "json",
  toBe() {
    return { userId: 1, id: 1, title: "delectus aut autem", completed: false };
  },
});
```

```sh
deno test

test fetch data ... ok (1440ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

### testRegExp

```typescript
test.testRegExp("regEx match", {
  expect: () => "https://google.com",
  toBe: () => new RegExp("^https?://[a-z.]+.com$"),
});
```

```sh
deno test

test regEx match ... ok (6ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (342ms)
```

### Usin async code.

you can use asynchronous code by adding `async` in `expect`, `toBe` and `value` functions.

example

```typescript
const test = new Merlin();

test.testEqual("get error 404", {
  async expect() {
    const response = await fetch("https://deno.land/std/example/examples.ts");

    const data = response.text();

    return data;
  },
  toBe() {
    return "404: Not Found";
  },
});
```

> **Note**: all the methods of the merlin class support asyn function since they have top level await

![merlin gif](https://cdn.discordapp.com/attachments/656976424778989602/735287285519745114/mer.gif)

## Create benchmarks using Maven

Maven is a benchmark tool for deno included in Merlin.

It's easy to use. `example`:

```typescript
import { Maven } from "https://deno.land/x/merlin/mod.ts";

const benchmark = new Maven();

benchmark.Bench({
  name: "Sorting arrays",
  fn: () => {
    new Array(10000).fill(Math.random()).sort();
  },
  steps: 1000,
});

benchmark.runBench();
```

this is the terminal output

![gif](https://cdn.discordapp.com/attachments/656976424778989602/735290326645735464/ezgif-7-c060645377b2.gif)

### Parameters

maven receives the following parameters.

- `name: string` benchmark name
- `fn(): void` function that contains the code
- `steps: number` number of times to repeat the benchmark

you can see the details at the end of the benchmark using

```typescript
import { Maven } from "https://deno.land/x/merlin/mod.ts";

const benchmark = new Maven();

benchmark.Bench({
  name: "Sorting arrays",
  fn: () => {
    new Array(10000).fill(Math.random()).sort();
  },
  steps: 1000,
});

benchmark.runBench().then(benchmark.Result());
```

It has a table with the detailed values

```sh
▒▒▒▒▒▒▒▒ Benchmarking finished

┌───────────────────────────────────────────────────────────────────────────────────────────┐
│ 🧪 Benchmark name:  Sorting arrays                                                        │
├───────────────────────┬──────────────────────────────┬────────────────────────────────────┤
│    Total runs: 1000   │  Total time: 1099.6591 ms    │  Avg time: 1.0997 ms               │
├───────────────────────┼────────────────────┬─────────┴───────────┬────────────────────────┤
│    min: 0.7768 ms     │ max: 9.9867 ms     │ mean: 5.3817 ms     │ median: 0.8511 ms      │
├───────────────────────┴────────────────────┴─────────────────────┴────────────────────────┤
│    Thresholds:  0 ========== 70 ========== 90 ========== ∞                                │
├───────────────────────────────┬───────────────────────────────────────────────────────────┤
│                               │                                                           │
│    0.7768 ms _[   965][96.5%] │========================================================   │
│    2.6188 ms _[    33][ 3.3%] │==                                                         │
│    4.4608 ms _[     1][ 0.1%] │=                                                          │
│    6.3027 ms _[     0][   0%] │                                                           │
│    8.1447 ms _[     1][ 0.1%] │=                                                          │
│                               │                                                           │
└───────────────────────────────┴───────────────────────────────────────────────────────────┘

```
