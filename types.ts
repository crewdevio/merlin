export interface testConfig {
  ignore?: boolean;
  expect(): any;
  toBe(value?: any): any;
  strict?: boolean;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only: boolean;
}

export interface Test extends testConfig {
  label: string;
}

export interface Config {
  ignore?: boolean;
  value: Function;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface Fetch_equal {
  url: string;
  type: "text" | "json";
  toBe: Function;
  message?: string;
  ignore?: boolean;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface ArrayContains {
  ignore?: boolean;
  value(): Array<any>;
  Contains(): any;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface StringContains {
  ignore?: boolean;
  value(): string;
  Contains(): string;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export interface NotEqual {
  expect: Function;
  notBe: Function;
  ignore?: boolean;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
}

export type Tests = Array<Test>;
