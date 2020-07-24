/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { colors } from "./deps.ts";

async function main() {
  const [command, ...args] = Deno.args;

  if (command === "start") {
    const process = Deno.run({
      cmd: ["deno", "test", "--allow-hrtime", ...args],
    });

    if ((await process.status()).success) {
      Deno.close(process.rid);
    } else {
      Deno.close(process.rid);
      throw new Error(colors.red("something went wrong running the test"))
        .message;
    }
  } else if (command === "help") {
    const info = [
      colors.green("merlin test runner v1.0.0 🧪\n"),
      colors.green("usage:"),
      `merlin ${colors.yellow("test")} ...allow-flags\n`,
      colors.green("example:"),
      `merlin ${colors.yellow("test")} --allow-net\n`,
    ];

    for (const log of info) {
      console.log(log);
    }
  } else {
    throw new Error(
      colors.red("this command was not found, try run: merlin help")
    ).message;
  }
}

if (import.meta.main) {
  await main();
}
