import { assertEquals, assertStrictEquals, assertNotEquals } from "./deps.ts";

export interface Test {
  label: string;
  expect(value?: any): any;
  toBe(value?: any): any;
  ignore?: boolean;
  strict?: boolean;
  message?: string;
}

interface Config {
  ignore?: boolean;
  expect(value?: any): any;
  toBe(value?: any): any;
  strict?: boolean;
  message?: string;
}

export type Tests = Array<Test>;

/**
 * testing framework for deno inspire in jest.
 * 🧙‍♂️
 */
export class Merlin {
  private Test = Deno.test;

  public test_equal(
    label: string,
    { expect, toBe, ignore, strict, message }: Config
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

  public test_notEqual(
    label: string,
    { expect, toBe, ignore, message }: Config
  ) {
    this.Test({
      name: label,
      fn: async () => {
        assertNotEquals(await expect(), await toBe(), message);
      },
      ignore,
    });
  }

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
}
