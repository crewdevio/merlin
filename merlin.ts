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
} from "./deps.ts";

export interface Test {
  label: string;
  expect(value?: any): any;
  toBe(value?: any): any;
  ignore?: boolean;
  strict?: boolean;
  message?: string;
}

interface testConfig {
  ignore?: boolean;
  expect(value?: any): any;
  toBe(value?: any): any;
  strict?: boolean;
  message?: string;
}

interface Config {
  ignore?: boolean;
  value: Function;
  message?: string;
}

export type Tests = Array<Test>;

/**
 * testing framework for deno inspire in jest 🧙‍♂️
 */
export class Merlin {
  private Test = Deno.test;

  /**
   * evaluate if two values ​​are equal.
   * @param {string} label - text to be shown in the test.
   * @param {Function} expect - returns the data to evaluate.
   * @param {Function} toBe - returns the data data that expects to be valid.
   * @param {boolean} ignore - ignore the test based on an expression that returns true or false.
   * @param {string} message - displays a message in case the test fails
   * @param {boolean} strict - compare data strictly
   */
  public test_equal(
    label: string,
    { expect, toBe, ignore, strict, message }: testConfig
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
    });
  }

  /**
   * evaluate if two values ​​are not equal.
   * @param {string} label - text to be shown in the test.
   * @param {Function} expect - returns the data to evaluate.
   * @param {Function} notBe - returns the data data that expects to not be valid.
   * @param {config} ignore - ignore the test based on an expression that returns true or false.
   * @param {config} message - displays a message in case the test fails
   */
  public test_notEqual(
    label: string,
    config: {
      expect: Function;
      notBe: Function;
      ignore?: boolean;
      message?: string;
    }
  ) {
    this.Test({
      name: label,
      fn: async () => {
        assertNotEquals(
          await config.expect(),
          await config.notBe(),
          config.message
        );
      },
      ignore: config.ignore,
    });
  }

  /**
   * evaluate multiple equality tests
   * @param {string} label - text to be shown in the test.
   * @param {Function} expect - returns the data to evaluate.
   * @param {Function} toBe - returns the data data that expects to be valid.
   * @param {config} ignore - ignore the test based on an expression that returns true or false.
   * @param {config} message - displays a message in case the test fails
   * @param {config} strict - compare data strictly
   */
  public eval_equals(tests: Tests) {
    for (const { expect, label, toBe, ignore, strict, message } of tests) {
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
      });
    }
  }

  public fetch_equal(
    label: string,
    config: {
      url: string;
      toBe: Function;
      message?: string;
      ignore?: boolean;
      type: "text" | "json";
    }
  ) {
    this.Test({
      name: label,
      fn: async () => {
        const response = await fetch(config.url);
        let data;
        if (config.type === "text") {
          data = await response.text();
        } else {
          data = await response.json();
        }
        assertEquals(await data, await config.toBe(await data), config.message);
      },
      ignore: config.ignore,
    });
  }

  public array_contains(
    label: string,
    config: {
      ignore?: boolean;
      value(): Array<any>;
      Contains(): any;
      message?: string;
    }
  ) {
    this.Test({
      name: label,
      ignore: config.ignore,
      fn: async () => {
        assertArrayContains(
          await config.value(),
          await config.Contains(),
          config.message
        );
      },
    });
  }

  public string_contains(
    label: string,
    config: {
      ignore?: boolean;
      value(): string;
      Contains(): any;
      message?: string;
    }
  ) {
    this.Test({
      name: label,
      ignore: config.ignore,
      fn: async () => {
        assertStringContains(
          await config.value(),
          await config.Contains(),
          config.message
        );
      },
    });
  }

  public be_null(label: string, { value, ignore, message }: Config) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert((await value()) === null, message);
      },
    });
  }

  public be_falsy(label: string, { value, ignore, message }: Config) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert(!(await value()), message);
      },
    });
  }

  public be_truthy(label: string, { value, ignore, message }: Config) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert((await value()) && true, message);
      },
    });
  }

  public is_bigInt(label: string, { value, ignore, message }: Config) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert(typeof (await value()) === "bigint", message);
      },
    });
  }

  public is_zero(label: string, { value, ignore, message }: Config) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert((await value()) - 0 === 0, message);
      },
    });
  }

  public is_NaN(label: string, { value, ignore, message }: Config) {
    this.Test({
      name: label,
      ignore,
      fn: async () => {
        assert(isNaN(await value()), message);
      },
    });
  }
}
