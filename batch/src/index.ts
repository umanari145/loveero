




#!/usr/bin/env node

import yargs from 'yargs';
import { promises as fs } from 'fs';

interface Arguments {
  input: string;
  output: string;
}

const argv = yargs(process.argv.slice(2)) // yargs に Node.js の引数を渡す (最初の2つを除く)
  .usage('Usage: $0 <command> [options]')
  .command(
    'process',
    'データを処理します',
    (yargs) => {
      return yargs
        .option('input', {
          alias: 'i',
          describe: '入力ファイルパス',
          demandOption: true,
          type: 'string', // 型を明示的に指定
        })
        .option('output', {
          alias: 'o',
          describe: '出力ファイルパス',
          demandOption: true,
          type: 'string', // 型を明示的に指定
        });
    },
    async (argv: Arguments) => {
      console.log(`処理コマンドが実行されました。入力ファイル: ${argv.input}, 出力ファイル: ${argv.output}`);
      await processData(argv.input, argv.output);
    }
  )
  .help()
  .argv as Arguments; // 型アサーション

async function processData(inputFile: string, outputFile: string): Promise<void> {
  try {
    const scraperList = ScraperFactory.getAllScrapers().map(scraper => ({
      name: scraper.name,
      baseUrl: scraper.baseUrl
    }));
      
    res.json({
      count: scraperList.length,
      scrapers: scraperList
    });

  } catch (err: any) { // より具体的なエラー型を指定することも可能
    console.error('エラーが発生しました:', err);
  }
}