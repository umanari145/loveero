import axios from "axios";
import { Scraper } from "../interface/Scraper";
import { load } from "cheerio";
import { Item } from "../interface/Item";
import { Thumbnail } from "../interface/Thumbnail";
import { StorageFactory } from "../infra/StorageFactory";

export class ScrapingService {
  private scraper: Scraper;

  constructor(scraper: Scraper) {
    this.scraper = scraper;
  }

  // HTTPリクエストを送信してHTMLを取得
  private async fetchHtml(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'max-age=0'
        },
        timeout: 30000,
        maxRedirects: 5
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching URL ${url}:`, error);
      throw new Error(`Failed to fetch HTML from ${url}`);
    }
  }

  // 一覧ページをスクレイピング
  public async scrapeListPage(page: number = 1): Promise<Thumbnail[]> {
    const url = this.scraper.listPage.url(page);
    const html = await this.fetchHtml(url);
    const site = load(html);
    return this.scraper.listPage.extract(site);
  }

  // 詳細ページをスクレイピング
  public async scrapeDetailPage(thumbnail: Thumbnail):Promise<Item> {
    const html = await this.fetchHtml(thumbnail.url);
    const detail = load(html);
    return this.scraper.detailPage.extract(detail, thumbnail);
  }
  
  // 複数ページをスクレイピングして結果を保存
  public async scrapeMultiplePages(startPage: number, endPage: number) {
    const items: Item[] = []
    for (let page = startPage; page <= endPage; page++) {
      console.log(`Scraping page ${page} of ${this.scraper.name}...`);

      try {
        // 一覧ページをスクレイピング
        const thumbnails = await this.scrapeListPage(page);
        console.log(`Found ${thumbnails.length} videos`);
        
        // 各動画の詳細ページをスクレイピング
        for (const thumbnail of thumbnails) {
          try {
            console.log(`Scraping details for (${thumbnail.url})`);
            const item = await this.scrapeDetailPage(thumbnail);
            items.push(item);
            // レート制限を回避するために少し待機
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          } catch (error) {
            console.error(`Error scraping video details for ${thumbnail.url}:`, error);
          }
        }
        // ページ間の待機時間
        await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 3000));
      } catch (error) {
        console.error(`Error scraping page ${page}:`, error);
      }
    }

    const storage = StorageFactory.getStorage();
    await storage.save(items);
  }

  public sum(a: number, b:number): number {
    return a+b
  }
}