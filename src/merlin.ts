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
  Length,
} from "./types.ts";

/**
 * testing framework for deno inspire in jest 🧙‍♂️
 */
export class Merlin {
  private Test = Deno.test;

  /**
   * evaluate if two values ​​are equal.
   * if the data is not the same it throws an error.
   */
  public testEqual(
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
   */
  public testNotEqual(
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
   */
  public evalEquals(tests: Tests) {
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
   */

  public fetchEqual(
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
   */
  public arrayContains(
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
   *
   */
  public stringContains(
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
   *
   */
  public beNull(
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
   *
   */
  public beFalsy(
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
   *
   */
  public beTruthy(
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
   *
   */
  public isBigInt(
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
   *
   */
  public isZero(
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
   *
   */
  public isNaN(
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

  /**
   * evaluates if a data have a x length
   *
   */
  public sameLength(
    label: string,
    {
      expect,
      toBe,
      ignore,
      Ops = true,
      Resources = true,
      message,
      only,
    }: Length
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert((await expect()).length === (await toBe()).length, message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a regular expression match
   *
   */
  public testRegExp(
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

  /**
   * evaluates if a data is a function
   *
   */
  public isFunction(
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

  /**
   * evaluates if a data is a symbol
   *
   */
  public isSymbol(
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

  /**
   * evaluates if a data is undefined
   *
   */
  public isUndefined(
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

  /**
   * expect the two values ​​to be strictly equal
   */
  public testSame(
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
        assertStrictEquals(await expect(), await toBe(), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect the expected value to be greater than or equal
   */
  public testGreaterOrEqual(
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
        assert((await expect()) >= (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect the expected value to be greater
   */
  public testGreater(
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
        assert((await expect()) > (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect the expected value to be less.
   */
  public testLess(
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
        assert((await expect()) < (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect the expected value to be less or equal.
   */
  public testLessOrEqual(
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
        assert((await expect()) <= (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect both values ​​to be instances of the same class
   */
  public testInstanceOf(
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
        assert((await expect()) instanceof (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  public testFloat(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
      strict,
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
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }
}
