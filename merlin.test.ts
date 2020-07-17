import { Merlin } from "./mod.ts";

const merlin = new Merlin();

merlin.test_equal("test", {
  expect: () => 2 + 2,
  toBe: async () => {
    return 4;
  },
  message: "error 2 + 2",
  ignore: Deno.build.os === "linux",
  strict: false,
});
