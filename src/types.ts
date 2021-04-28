interface Fields {
  /** receives a boolean to ignore the test in case the value is true */
  ignore?: boolean;
  /** receives a string with the message to display in case the test fails */
  message?: string;
  /** receives a boolean, closes all the operations that never end */
  Ops?: boolean;
  /** receives a boolean, terminates all asynchronous processes that interact with the system */
  Resources?: boolean;
  /** receives a boolean, only tests that have only in true will be executed, the rest will not run */
  only?: boolean;
  //ensures that tested code doesn't call Deno.exit() signaling a false test success.
  Exit?: boolean;
  /** execute any action before run test */
  before?: () => void | undefined | Promise<void | undefined>;
}

interface Strict {
  /** receives a boolean, it does a strict comparison of the values */
  strict?: boolean;
}

export interface Is<T extends unknown> extends Fields {
  /** returns the data expected to be of that type */
  value(): Promise<T> | T;
}

export interface Asserts<T extends unknown | any> extends Fields {
  /** this function returns the data and then tests with its matchmaker */
  expect(): Promise<T> | T;
  /** this function returns the data that we hope is correct */
  toBe(): Promise<T> | T;
}

export interface AssertsStrict<T extends unknown | any>
  extends Fields,
    Strict,
    Asserts<T> {}

export interface Test<T> extends Fields, AssertsStrict<T> {
  /** add a description to the test */
  label: string;
}

export interface Fetch_equal extends Fields {
  url: string;
  config?: RequestInit;
  type: "text" | "json";
  /** this function returns the data that we hope is correct */
  toBe(): Promise<any> | any;
}

export interface ArrayContains<T extends unknown> extends Fields {
  /** returns the data expected to be of that type */
  value(): Promise<T[]> | T[];
  Contains(): Promise<T[]> | T[];
}

export interface StringIncludes extends Fields {
  /** returns the data expected to be of that type */
  value(): Promise<string> | string;
  Contains(): Promise<string> | string;
}

export interface NotEqual extends Fields {
  /** this function returns the data and then tests with its matchmaker */
  expect(): Promise<any> | any;
  /** this function returns the data that we hope it is incorrect */
  notBe(): Promise<any> | any;
}

export interface Length extends Fields {
  /** this function returns the data and then tests with its matchmaker */
  expect(): Promise<ArrayLike<any>> | ArrayLike<any> | string | Promise<string>;
  /** this function returns the data that we hope is correct */
  toBe(): Promise<ArrayLike<any>> | ArrayLike<any> | string | Promise<string>;
}

export interface throws extends Fields {
  throws(): undefined | void | Promise<void | undefined>;
  ErrorClass?: any;
}

export interface Bench {
  /** benchmark name */
  name: string;
  /**  number of times to repeat the benchmark */
  steps?: number;
  /** function that contains the code */
  fn: Function;
}

export interface Thresholds {
  [key: string]: { green: number; yellow: number };
}

export interface EmitConfig {
  fileName?: string;
  title?: string;
  description?: string;
  json?: boolean;
}

export type Tests<T> = Array<Test<T>>;

export type BoolLike =
  | string
  | boolean
  | Array<any>
  | object
  | null
  | undefined
  | number;

export type ArrayLike<T> = Uint16Array | Uint32Array | Uint8Array | T[];
