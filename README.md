<p align="center">
  <img src="http://pixelartmaker.com/art/b5da8523654c61c.png" width="130px" />
  <h3 align="center">Testing and Benchmarking framework for deno 🧙‍♂️</h3>
</p>

## Merlin

Merlin is a [Jest](https://jestjs.io/en/)-inspired testing framework for deno.

### use

example `merlin.test.ts`

```typescript

import { Merlin } from "https://deno.land/x/merlin/mod.ts";

const test = new Merlin();

test.test_equal("2 + 2", {
  message: "error adding 2 + 2",
  expect: () => {
    return 2 + 2;
  },
  toBe: () => {
    return 4;
  },
  ignore: Deno.build.os === "linux",
});

```
then you run in terminal.

```sh
$ deno test
```
you should see this by console.

```sh
running 1 tests
test 2 + 2 ... ok (15ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (32ms)
```
