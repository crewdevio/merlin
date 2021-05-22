/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { colors } from "./deps.ts";

const VERSION = "v2.0.0";

async function main() {
  let [command, ...args] = Deno.args;

  // args = args.includes("--allow-hr")

  if (["start", "test"].includes(command)) {
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
  } else if (
    ["help", "--help", "-h"].includes(command) ||
    command === undefined
  ) {
    const info = [
      colors.green(`merlin cli 🧪\n`),

      colors.green("\nusage:\n"),
      `   merlin ${colors.yellow("[start or test]")} ...allow-flags\n`,

      colors.green("\nexample:\n"),
      `   merlin ${colors.yellow("start")} --allow-net\n`,

      colors.green("\ncommands:\n"),
      colors.yellow(
        `--help,    -h, help      ${colors.white("show help info\n")}`
      ),
      colors.yellow(
        `--version, -v, version   ${colors.white("show merlin cli version\n")}`
      ),

      colors.green("\ntesting flags:\n"),
      `${colors.yellow(" --filter")}    ${colors.white(
        "filter the tests that contain keywords"
      )}\n`,
      `${colors.yellow(" --failfast")}  ${colors.white(
        "If you have a long running test suite and wish for it to stop on the first failure"
      )}\n`,

      colors.green(
        `\nDirectory arguments are expanded to all contained files matching the glob\n${colors.red(
          "{*_,*.,}test.{js,mjs,ts,jsx,tsx}:"
        )}\n`
      ),
    ];

    console.log(info.join(""));
  } else if (["version", "--version", "-v"].includes(command)) {
    console.log(
      `${colors.green(
        `merlin cli: ${colors.yellow(VERSION)}`
      )} \n${colors.green(`Deno: ${colors.yellow(Deno.version.deno)}`)}`
    );
  } else {
    console.log({ command });
    throw new Error(
      colors.red("this command was not found, try run: merlin help")
    ).message;
  }
}

if (import.meta.main) {
  await main();
}
