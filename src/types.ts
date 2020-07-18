interface Configuration{
  strict?: boolean;
  message?: string;
  Ops?: boolean;
  Resources?: boolean;
  only?: boolean;
  ignore?: boolean;
}

export interface testConfig extends Configuration {
  expect(): any;
  toBe(value?: any): any;
}

export interface length extends Configuration {
  value: Function;
  toBe(): number;
}

export interface Test extends testConfig {
  label: string;
}

export interface Config extends Configuration {
  value: Function;
}

export interface Fetch_equal extends Configuration{
  url: string;
  type: "text" | "json";
  toBe: Function;
}

export interface ArrayContains extends Configuration {
  value(): Array<any>;
  Contains(): any;
}

export interface StringContains extends Configuration{
  value(): string;
  Contains(): string;
}

export interface NotEqual extends Configuration{
  expect: Function;
  notBe: Function;
}

export type Tests = Array<Test>;
