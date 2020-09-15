/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  prettyBenchmarkProgress,
  prettyBenchmarkResult,
} from "../imports/pretty_benching.ts";
import { colors } from "../imports/fmt.ts";
import { bench } from "../imports/testing.ts";
import type { Thresholds, Bench } from "./types.ts";

export class Maven {
  private bench = bench.bench;

  private thresholds: Thresholds = {};

  private config: bench.BenchmarkRunOptions = {};

  private indicators = [
    {
      benches: /./,
      tableColor: colors.cyan,
      modFn: () => "🚀",
    },
  ];

  private runIndicator = [{ benches: /./, modFn: () => "==> " }];

  private addThreasholds(name: string) {
    this.thresholds[name] = { green: 70, yellow: 90 };
  }

  public Bench({ fn, name, steps = 1 }: Bench) {
    this.addThreasholds(name);
    this.bench({
      name,
      func(bench) {
        bench.start();
        fn();
        bench.stop();
      },
      runs: steps,
    });
  }

  public async runBench(config?: bench.BenchmarkRunOptions) {
    this.config = config as bench.BenchmarkRunOptions;
    return bench.runBenchmarks(
      { silent: true, ...config },
      prettyBenchmarkProgress({
        indicators: this.runIndicator,
        thresholds: this.thresholds,
      })
    );
  }

  public async success() {
    return await this.runBench(this.config);
  }

  public Result(graphBars = 5) {
    return prettyBenchmarkResult({
      thresholds: this.thresholds,
      indicators: this.indicators,
      parts: {
        extraMetrics: true,
        graph: true,
        threshold: true,
        graphBars,
      },
    });
  }
}
