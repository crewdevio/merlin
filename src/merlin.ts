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
  Fetch_equal,
  NotEqual,
  StringIncludes,
  Tests,
  Length,
  throws,
  BoolLike,
  Is,
  Asserts,
  AssertsStrict,
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
      Exit = true,
      only,
      before = async () => {},
    }: AssertsStrict<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

        if (strict) {
          asserts.assertStrictEquals(await expect(), await toBe(), message);
        } else {
          asserts.assertEquals(await expect(), await toBe(), message);
        }
      },
      ignore,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: NotEqual
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assertNotEquals(await expect(), await notBe(), message);
      },
      ignore,
      only: only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      only,
      before = async () => {},
    } of tests) {
      this.Test({
        name: label,
        fn: async () => {
          await before();

          if (strict) {
            asserts.assertStrictEquals(await expect(), await toBe(), message);
          } else {
            asserts.assertEquals(await expect(), await toBe(), message);
          }
        },
        ignore,
        sanitizeOps: Ops,
        sanitizeResources: Resources,
        sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      config,
      before = async () => {},
    }: Fetch_equal
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

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
      sanitizeExit: Exit,
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
      Exit = true,
      only,
      before = async () => {},
    }: ArrayContains<T>
  ) {
    this.Test({
      name: label,
      ignore: ignore,
      fn: async () => {
        await before();
        asserts.assertArrayIncludes(await value(), await Contains(), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: StringIncludes
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();
        asserts.assertStringIncludes(await value(), await Contains(), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is null.
   *
   */
  public beNull<T extends null>(
    label: string,
    {
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      Exit = true,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();
        asserts.assertEquals(await value(), null, message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is a falsy value.
   *
   */
  public beFalsy<T extends BoolLike>(
    label: string,
    {
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      Exit = true,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();
        asserts.assert(!(await value()), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is a truthy value.
   *
   */
  public beTruthy<T extends BoolLike>(
    label: string,
    {
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      Exit = true,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();
        asserts.assert((await value()) && true, message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is a bigInt value.
   *
   */
  public isBigInt<T extends BigInt>(
    label: string,
    {
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      Exit = true,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();
        asserts.assert(typeof (await value()) === "bigint", message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is zero.
   *
   */
  public isZero<T extends number>(
    label: string,
    {
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      Exit = true,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();
        asserts.assert((await value()) - 0 === 0, message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is NaN value.
   *
   */
  public isNaN<T extends number>(
    label: string,
    {
      value,
      ignore,
      message,
      Ops = true,
      Resources = true,
      Exit = true,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();
        asserts.assert(isNaN(await value()), message);
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      message,
      only,
      before = async () => {},
    }: Length
  ) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        await before();

        asserts.assert(
          (await expect()).length === (await toBe()).length,
          message
        );
      },
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Asserts<any>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assertMatch(await expect(), await toBe(), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is a function
   *
   */
  public isFunction<T extends Function>(
    label: string,
    {
      value,
      Ops = true,
      Resources = true,
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assert(typeof (await value()) === "function", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is a symbol
   *
   */
  public isSymbol<T extends Symbol>(
    label: string,
    {
      value,
      Ops = true,
      Resources = true,
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

        asserts.assert(typeof (await value()) === "symbol", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is undefined
   *
   */
  public isUndefined<T extends undefined | void>(
    label: string,
    {
      value,
      Ops = true,
      Resources = true,
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

        asserts.assert(typeof (await value()) === "undefined", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is string
   *
   */
  public isString<T extends string>(
    label: string,
    {
      value,
      Ops = true,
      Resources = true,
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

        asserts.assert(typeof (await value()) === "string", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is number
   *
   */
  public isNumber<T extends number>(
    label: string,
    {
      value,
      Ops = true,
      Resources = true,
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

        asserts.assert(typeof (await value()) === "number", message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is empty
   */
  public isEmpty<T extends ArrayLike<any> | string | object>(
    label: string,
    {
      value,
      Ops,
      Resources,
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

        let count: number = 1;

        if (typeof (await value()) === "string") {
          count = ((await value()) as string).length;
        } else if ((await value()) instanceof Array) {
          count = ((await value()) as Array<any>).length;
        } else if ((await value()) instanceof Object) {
          count = Object.keys(await value()).length;
        }

        asserts.assertEquals(count, 0, message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
    });
  }

  /**
   * evaluates if a data is empty
   */
  public isEmpty<T extends ArrayLike<any> | string | object>(
    label: string,
    {
      value,
      Ops,
      Resources,
      ignore,
      message,
      only,
      before = async () => {},
    }: Is<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();

        let count: number = 1;

        if (typeof (await value()) === "string") {
          count = ((await value()) as string).length;
        } else if ((await value()) instanceof Array) {
          count = ((await value()) as Array<any>).length;
        } else if ((await value()) instanceof Object) {
          count = Object.keys(await value()).length;
        }

        asserts.assertEquals(count, 0, message);
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
      Exit = true,
      only,
      before = async () => {},
    }: any
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
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
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Asserts<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assertStrictEquals(await expect(), await toBe(), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Asserts<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assert((await expect()) >= (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Asserts<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assert((await expect()) > (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Asserts<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assert((await expect()) < (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Asserts<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assert((await expect()) <= (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      before = async () => {},
    }: Asserts<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
        asserts.assert((await expect()) instanceof (await toBe()), message);
      },
      ignore,
      only,
      sanitizeOps: Ops,
      sanitizeResources: Resources,
      sanitizeExit: Exit,
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
      Exit = true,
      ignore,
      message,
      only,
      strict,
      before = async () => {},
    }: AssertsStrict<T>
  ) {
    this.Test({
      name: label,
      fn: async () => {
        await before();
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
      sanitizeExit: Exit,
    });
  }

  /**
   * expect it throws an error.
   */
  public assertThrows(
    label: string,
    { throws, ErrorClass, Ops, Resources, Exit ,ignore, message, only }: throws
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
      sanitizeExit: Exit,
    });
  }

  /**
   * expect it throws an async error
   */
  public assertThrowsSync(
    label: string,
    { throws, ErrorClass, Ops, Resources, Exit, ignore, message, only }: throws
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
      sanitizeExit: Exit,
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
