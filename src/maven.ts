/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  bench,
  runBenchmarks,
  BenchmarkResult,
  BenchmarkRunOptions,
  prettyBenchmarkProgress,
  prettyBenchmarkResult,
  colors,
} from "../deps.ts";
interface Bench {
  name: string;
  steps?: number;
  fn: Function;
}

interface Thresholds {
  [key: string]: { green: number; yellow: number };
}

export type BenchResult = BenchmarkResult;

export class Maven {
  private bench = bench;

  private thresholds: Thresholds = {};

  private config: BenchmarkRunOptions = {};

  private indicators = [
    {
      benches: /./,
      tableColor: colors.cyan,
      modFn: () => "🧪",
    },
  ];

  private runIndicator = [{ benches: /./, modFn: () => colors.green(" ==> ") }];

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

  public async runBench(config?: BenchmarkRunOptions) {
    this.config = config as BenchmarkRunOptions;
    return runBenchmarks(
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
