import type { bench } from "../imports/testing.ts";

export interface testConfig<T extends unknown | any> {
  ignore?: boolean;
  expect(): Promise<T> | T;
  toBe(): Promise<T> | T;
  strict?: boolean;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface Test<T> extends testConfig<T> {
  label: string;
}

export interface Config<T extends unknown> {
  ignore?: boolean;
  value(): Promise<T> | T;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface Fetch_equal {
  url: string;
  config?: RequestInit;
  type: "text" | "json";
  toBe(): Promise<any> | any;
  message?: string;
  ignore?: boolean;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface ArrayContains<T extends unknown> {
  ignore?: boolean;
  value(): Promise<T[]> | T[];
  Contains(): Promise<T[]> | T[];
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface StringIncludes {
  ignore?: boolean;
  value(): Promise<string> | string;
  Contains(): Promise<string> | string;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface NotEqual {
  expect(): Promise<any> | any;
  notBe(): Promise<any> | any;
  ignore?: boolean;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface Length {
  ignore?: boolean;
  expect(): Promise<ArrayLike<any>> | ArrayLike<any> | string | Promise<string>;
  toBe(): Promise<ArrayLike<any>> | ArrayLike<any> | string | Promise<string>;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface throws {
  throws(): void | Promise<void>;
  ignore?: boolean;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
  ErrorClass?: any;
}

export interface Bench {
  name: string;
  steps?: number;
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

export type BenchResult = bench.BenchmarkResult;

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
