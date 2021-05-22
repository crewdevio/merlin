/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Thresholds, Bench } from "./types.ts";
import { pretty_benching } from "../deps.ts";
import { colors } from "../deps.ts";
import { bench } from "../deps.ts";

const { prettyBenchmarkProgress, prettyBenchmarkResult } = pretty_benching;

/**
 * create simple and scalable  benchmarks for typescript and javascript, running on deno
 */
export class Maven {
  private static bench = bench.bench;

  private static thresholds: Thresholds = {};

  protected static config: bench.BenchmarkRunOptions = {};

  private static indicators = [
    {
      benches: /./,
      tableColor: colors.cyan,
      modFn: () => "🚀",
    },
  ];

  private static runIndicator = [{ benches: /./, modFn: () => "==> " }];

  private static addThresholds(name: string) {
    Maven.thresholds[name] = { green: 70, yellow: 90 };
  }

  /**
   * create bench mark action.
   *
   * `example:`
   * ```typescript
   * import { Maven } from "./mod.ts";
   *
   * Maven.Bench({
   *  name: "sort",
   *  fn() {
   *    [].fill(0).sort();
   *  },
   *  steps: 1000,
   * });
   *
   * ```
   */
  public static Bench({ fn, name, steps = 1 }: Bench) {
    Maven.addThresholds(name);
    Maven.bench({
      name,
      func(bench) {
        bench.start();
        fn();
        bench.stop();
      },
      runs: steps,
    });
  }

  /**
   * execute the benchmarks
   *
   *`example:`
   * ```typescript
   * import { Maven } from "./mod.ts";
   *
   * Maven.Bench({
   *  name: "sort",
   *  fn() {
   *    [].fill(0).sort();
   *  },
   *  steps: 1000,
   * });
   *
   * Maven.runBench();
   *
   *```
   *
   * @param {bench.BenchmarkRunOptions} config
   */
  public static async runBench(config?: bench.BenchmarkRunOptions) {
    Maven.config = config as bench.BenchmarkRunOptions;
    return bench.runBenchmarks(
      { silent: true, ...config },
      prettyBenchmarkProgress({
        indicators: Maven.runIndicator,
        thresholds: Maven.thresholds,
      })
    );
  }

  /**
   * prints the results table at the end of the benchmarks
   *
   * `example:`
   * ```typescript
   * import { Maven } from "./mod.ts";
   *
   * Maven.Bench({
   *  name: "sort",
   *  fn() {
   *    [].fill(0).sort();
   *  },
   *  steps: 1000,
   * });
   *
   * Maven.runBench().then(Maven.Result(2));
   *
   * ```
   * @param {number} graphBars
   */
  public static Result(graphBars: number = 3) {
    return prettyBenchmarkResult({
      thresholds: Maven.thresholds,
      indicators: Maven.indicators,
      parts: {
        extraMetrics: true,
        graph: true,
        threshold: true,
        graphBars,
      },
    });
  }
}
