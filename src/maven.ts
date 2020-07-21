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
} from "../deps.ts";

interface Bench {
  name: string;
  steps?: number;
  fn: Function;
}

export type BenchResult = BenchmarkResult;

export class Maven {
  private bench = bench;

  private config: BenchmarkRunOptions = {};

  public Bench({ fn, name, steps = 1 }: Bench) {
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
    return runBenchmarks(config, prettyBenchmarkProgress());
  }

  public async success() {
    return await this.runBench(this.config);
  }

  public Result(graphBars = 5) {
    return prettyBenchmarkResult({
      parts: {
        extraMetrics: true,
        graph: true,
        threshold: true,
        graphBars,
      },
    });
  }
}
