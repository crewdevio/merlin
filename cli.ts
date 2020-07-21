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
      throw new Error(colors.red("something went wrong trying to run the test"))
        .message;
    }
  } else if (command === "help") {
    console.log("help info...");
  } else {
    throw new Error(
      colors.red("this command was not found, try run: merlin help")
    ).message;
  }
}

if (import.meta.main) {
  await main();
}
