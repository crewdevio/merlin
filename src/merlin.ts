/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { asserts } from "../imports/testing.ts";

import type {
  ArrayContains,
  Config,
  Fetch_equal,
  NotEqual,
  StringIncludes,
  Tests,
  testConfig,
  Length,
  throws,
  BoolLike,
} from "./types.ts";
import { colors } from "../imports/fmt.ts";

/**
 * testing framework for deno inspire in jest 🧙‍♂️
 */
export class Merlin {
  private Test = Deno.test;

  /**
   * evaluate if two values ​​are equal.
   * if the data is not the same it throws an error.
   */
  public assertEqual<T>(
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
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        if (strict) {
          asserts.assertStrictEquals(await expect(), await toBe(), message);
        } else {
          asserts.assertEquals(await expect(), await toBe(), message);
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
  public assertNotEqual(
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
        asserts.assertNotEquals(await expect(), await notBe(), message);
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
  public evalEquals<T>(tests: Tests<T>) {
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
            asserts.assertStrictEquals(await expect(), await toBe(), message);
          } else {
            asserts.assertEquals(await expect(), await toBe(), message);
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
      config,
    }: Fetch_equal
  ) {
    this.Test({
      name: label,
      fn: async () => {
        const response = await fetch(url, config);
        let data;
        if (type === "text") {
          data = await response.text();
        } else {
          data = await response.json();
        }
        asserts.assertEquals(await data, await toBe(), message);
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
  public arrayContains<T>(
    label: string,
    {
      Contains,
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      only,
    }: ArrayContains<T>
  ) {
    this.Test({
      name: label,
      ignore: ignore,
      fn: async () => {
        asserts.assertArrayIncludes(await value(), await Contains(), message);
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
  public stringIncludes(
    label: string,
    {
      Contains,
      value,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: StringIncludes
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        asserts.assertStringIncludes(await value(), await Contains(), message);
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
  public beNull<T extends null>(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        asserts.assertEquals(await value(), null, message);
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
  public beFalsy<T extends BoolLike>(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        asserts.assert(!(await value()), message);
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
  public beTruthy<T extends BoolLike>(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        asserts.assert((await value()) && true, message);
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
  public isBigInt<T extends BigInt>(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        asserts.assert(typeof (await value()) === "bigint", message);
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
  public isZero<T extends number>(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        asserts.assert((await value()) - 0 === 0, message);
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
  public isNaN<T extends number>(
    label: string,
    { value, ignore, message, Ops = true, Resources = true, only }: Config<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        asserts.assert(isNaN(await value()), message);
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
        asserts.assert(
          (await expect()).length === (await toBe()).length,
          message
        );
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
  public assertRegExp(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig<any>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assertMatch(await expect(), await toBe(), message);
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
  public isFunction<T extends Function>(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert(typeof (await value()) === "function", message);
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
  public isSymbol<T extends Symbol>(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert(typeof (await value()) === "symbol", message);
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
  public isUndefined<T extends undefined>(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert(typeof (await value()) === "undefined", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is string
   *
   */
  public isString<T extends string>(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert(typeof (await value()) === "string", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * evaluates if a data is number
   *
   */
  public isNumber<T extends number>(
    label: string,
    { value, Ops = true, Resources = true, ignore, message, only }: Config<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert(typeof (await value()) === "number", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect an object to contain the properties in its value
   */
  public haveProperty(
    label: string,
    {
      Contains,
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      only,
    }: any
  ) {
    this.Test({
      name: label,
      fn: async () => {
        const _Contains = Object.keys(await Contains());
        const _value = Object.keys(await value());

        const errorTrace: string[] = [];
        for (const keys of _value) {
          if (!_Contains.includes(keys)) {
            errorTrace.push(
              colors.green(
                `\n\ndoes not have the property: ${colors.red(keys)}\n`
              )
            );
          }
        }

        if (errorTrace.length) {
          Merlin.Error(errorTrace.join(""));
        }

        asserts.assert(true, message);
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
  public assertSame<T extends any>(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assertStrictEquals(await expect(), await toBe(), message);
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
  public assertGreaterOrEqual<T extends number>(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert((await expect()) >= (await toBe()), message);
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
  public assertGreater<T extends number>(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert((await expect()) > (await toBe()), message);
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
  public assertLess<T extends number>(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert((await expect()) < (await toBe()), message);
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
  public assertLessOrEqual<T extends number>(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert((await expect()) <= (await toBe()), message);
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
  public assertInstanceOf<T extends Function>(
    label: string,
    {
      expect,
      toBe,
      Ops = true,
      Resources = true,
      ignore,
      message,
      only,
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        asserts.assert((await expect()) instanceof (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect both float values ​​to be equal.
   */
  public assertFloat<T extends number>(
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
    }: testConfig<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        if (strict) {
          asserts.assertStrictEquals(await expect(), await toBe(), message);
        } else {
          asserts.assertEquals(await expect(), await toBe(), message);
        }
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect it throws an error.
   */
  public assertThrows(
    label: string,
    { throws, ErrorClass, Ops, Resources, ignore, message, only }: throws
  ) {
    this.Test({
      name: label,
      fn: () => {
        asserts.assertThrows(
          () => {
            throws();
          },
          ErrorClass,
          message
        );
      },
      sanitizeOps: Ops,
      ignore,
      only,
      sanitizeResources: Resources,
    });
  }

  /**
   * expect it throws an async error
   */
  public assertThrowsSync(
    label: string,
    { throws, ErrorClass, Ops, Resources, ignore, message, only }: throws
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await asserts.assertThrowsAsync(
          async () => {
            throws();
          },
          ErrorClass,
          message
        );
      },
      sanitizeOps: Ops,
      ignore,
      only,
      sanitizeResources: Resources,
    });
  }

  /**
   * force to throw an error
   */
  public static Error(msg?: string) {
    return asserts.fail(msg);
  }

  /**
   * Use this to throw a method not implemented error
   */
  public static Unimplemented(msg?: string) {
    return asserts.unimplemented(msg);
  }

  /**
   * Use this to throw an Unreachable  method error.
   */
  public static Unreachable() {
    return asserts.unreachable();
  }
}
