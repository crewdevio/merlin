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
  prettyBenchmarkDown,
} from "../imports/pretty_benching.ts";
import type { Thresholds, Bench, EmitConfig } from "./types.ts";
import { colors } from "../imports/fmt.ts";
import { bench } from "../imports/testing.ts";

/**
 * create simple and scalable  benchmarks for typescript and javascript, running on deno
 */
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

  private addThresholds(name: string) {
    this.thresholds[name] = { green: 70, yellow: 90 };
  }

  /**
   * 
   */
  public Bench({ fn, name, steps = 1 }: Bench) {
    this.addThresholds(name);
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

  /**
   * execute the benchmarks
   * @param config
   */
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

  /**
   * prints the results table at the end of the benchmarks
   * @param graphBars
   */
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

  /**
   * create a markdown file with the results of the benchmarks, it can also be issued in json format
   * @param config
   */
  public static Emit(config: EmitConfig) {
    const _fileName = `/${
      config.fileName ? config.fileName : "out_put"
    }-${new Date().getTime()}`;

    return prettyBenchmarkDown(
      (markdown: string) => {
        const create = Deno.createSync(`${Deno.cwd()}${_fileName}.md`);
        Deno.writeTextFileSync(`.${_fileName}.md`, markdown);
        create.close();
      },
      {
        title: config.title ? config.title : "Maven Benchmark output",
        description: config.description ? config.description : "",
        afterTables: (result: any) => {
          if (config.json) {
            const create = Deno.createSync(`${Deno.cwd()}${_fileName}.json`);
            Deno.writeTextFileSync(
              `.${_fileName}.json`,
              JSON.stringify(result, null, 2)
            );
            create.close();
          }
          return "";
        },
      }
    );
  }
}
