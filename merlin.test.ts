import { Merlin } from "./mod.ts";

const merlin = new Merlin();

merlin.fetch_equal("load text", {
  url: "https://deno.land/std/examples/welcome.ts",
  type: "text",
  message: "eval console.log",
  toBe: (val: any) => {
    return val;
  },
});
