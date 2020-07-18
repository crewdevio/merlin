/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  assert,
  assertEquals,
  assertStrictEquals,
  assertNotEquals,
  assertArrayContains,
  assertStringContains,
  assertMatch,
} from "../deps.ts";

import {
  ArrayContains,
  Config,
  Fetch_equal,
  NotEqual,
  StringContains,
  Tests,
  testConfig,
} from "./types.ts";

/**
 * testing framework for deno inspire in jest 🧙‍♂️
 */
export class Merlin {
  private Test = Deno.test;

  /**
   * evaluate if two values ​​are equal.
   * if the data is not the same it throws an error.
   * @param {string} label - text to be shown in the test.
   * @param {Function} expect - returns the data to evaluate.
   * @param {Function} toBe - returns the data data that expects to be valid.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} strict - compare data strictly.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   */
  public test_equal(
    label: string,
    {
      expect,
      toBe,
      ignore,
      strict,
      message,
      Ops = true,
      Resources = true,
      only,
    }: testConfig
  ) {
    this.Test({
      name: label,
      fn: async () => {
        if (strict) {
          assertStrictEquals(await expect(), await toBe(), message);
        } else {
          assertEquals(await expect(), await toBe(), message);
        }
      },
      ignore,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      only,
    });
  }

  /**
   * evaluate if two values ​​are not equal.
   * if they are not different throw an error.
   * @param {string} label - text to be shown in the test.
   * @param {Function} expect - returns the data to evaluate.
   * @param {Function} notBe - returns the data data that expects to not be valid.
   * @param {config} ignore - ignore the test based on an expression that returns true or false.
   * @param {config} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   */
  public test_notEqual(
    label: string,
    {
      expect,
      notBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: NotEqual
  ) {
    this.Test({
      name: label,
      fn: async () => {
        assertNotEquals(await expect(), await notBe(), message);
      },
      ignore,
      only: only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluate multiple equality tests.
   * if the data is not the same it throws an error.
   * @param {string} label - text to be shown in the test.
   * @param {Function} expect - returns the data to evaluate.
   * @param {Function} toBe - returns the data data that expects to be valid.
   * @param {config} ignore - ignore the test based on an expression that returns true or false.
   * @param {config} message - displays a message in case the test fails.
   * @param {config} strict - compare data strictly.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   */
  public eval_equals(tests: Tests) {
    for (const {
      expect,
      label,
      toBe,
      ignore,
      strict,
      message,
      Ops = true,
      Resources = true,
      only,
    } of tests) {
      this.Test({
        name: label,
        fn: async () => {
          if (strict) {
            assertStrictEquals(await expect(), await toBe(), message);
          } else {
            assertEquals(await expect(), await toBe(), message);
          }
        },
        ignore,
        sanitizeOps: Ops,
        sanitizeResources: Resources,
        only,
      });
    }
  }

  /**
   * evaluate if two values ​​are equal.
   * If the request data is not the same as expected, it throws an error.
   * @param {string} label - text to be shown in the test.
   * @param {string} ulr - url to make the request get.
   * @param {Function} toBe - returns the data data that expects to be valid.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {string} type - type of data to which the request will be converted.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   */

  public fetch_equal(
    label: string,
    {
      toBe,
      type,
      url,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: Fetch_equal
  ) {
    this.Test({
      name: label,
      fn: async () => {
        const response = await fetch(url);
        let data;
        if (type === "text") {
          data = await response.text();
        } else {
          data = await response.json();
        }
        assertEquals(await data, await toBe(), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates that the array contains the data.
   * if the array does not contain the data it throws an error.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the array to evaluate.
   * @param {Function} Contains - returns the data that the array must have.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   */
  public array_contains(
    label: string,
    {
      Contains,
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      only,
    }: ArrayContains
  ) {
    this.Test({
      name: label,
      ignore: ignore,
      fn: async () => {
        assertArrayContains(await value(), await Contains(), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates that the string contains the data.
   * if the string does not contain the data it throws an error.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the string to evaluate.
   * @param {Function} Contains - returns the data that the string must have.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   *
   */
  public string_contains(
    label: string,
    {
      Contains,
      value,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: StringContains
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assertStringContains(await value(), await Contains(), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is null.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the data to evaluate.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   *
   */
  public be_null(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assertEquals(await value(), null, message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is a falsy value.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the data to evaluate.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   *
   */
  public be_falsy(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert(!(await value()), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is a truthy value.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the data to evaluate.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   *
   */
  public be_truthy(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert((await value()) && true, message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is a bigInt value.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the data to evaluate.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   *
   */
  public is_bigInt(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert(typeof (await value()) === "bigint", message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is zero.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the data to evaluate.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   *
   */
  public is_zero(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert((await value()) - 0 === 0, message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is NaN value.
   * @param {string} label - text to be shown in the test.
   * @param {Function} value - returns the data to evaluate.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails.
   * @param {boolean} only - run only tests that have only: true
   * @param {boolean} Ops - ends asynchronous operations that don't end. default (true)
   * @param {boolean} Resources - close all processes that do not finish to avoid resource leak. default (true)
   *
   */
  public is_NaN(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert(isNaN(await value()), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  public test_RegExp(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig
  ) {
    this.Test({
      name: label,
      fn: async () => {
        assertMatch(await expect(), await toBe(), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  public is_fn(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config
  ) {
    this.Test({
      name: label,
      fn: async () => {
        assert(typeof (await value()) === "function", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  public is_symbol(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config
  ) {
    this.Test({
      name: label,
      fn: async () => {
        assert(typeof (await value()) === "symbol", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  public is_undefined(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config
  ) {
    this.Test({
      name: label,
      fn: async () => {
        assert(typeof (await value()) === "undefined", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }
}
