import { Scraper } from "@/interface/Scraper";
import { dummySite1 } from "../scrapers/dummySite1";
import { ScrapingService } from "../service/ScraperService";
import { StorageFactory } from "../infra/StorageFactory";
import { Item } from "@/interface/Item";
// なぜか@だとよみこめないmoduleあり

describe('Scraper', () => {
  it('constructor起動', () => {
    const ss:Scraper = dummySite1;
    const scraperService  = new ScrapingService(ss);
    const ans1 = scraperService.sum(1,2)
    expect(ans1).toBe(3);
  });

  it('scraping list', async() => {
    const ss:Scraper = dummySite1;
    const scraperService  = new ScrapingService(ss);
    const items = await scraperService.scrapeListPage(1)
    //console.log(items)
    expect(items.length).toBeGreaterThanOrEqual(1);
    // resをループして各プロパティの検証
    items.forEach((item) => {
      expect(item.title).not.toBe('');
      expect(item.thumbnail).toMatch(/^https:\/\//);
      expect(item.url).toMatch(/^https:\/\/4545\.to\/video\/play\/\d+$/);
    })
  }, 20000);

  // it.only この関数だけを実行させたい時
  it('scraping detail', async() => {
    const ss:Scraper = dummySite1;
    const scraperService  = new ScrapingService(ss);
    const items = await scraperService.scrapeListPage(1)
    const item:Item = await scraperService.scrapeDetailPage(items[0])
    //console.log(item)
    expect(item.title).not.toBe('');
    expect(item.url).toMatch(/^https:\/\/4545\.to\/video\/play\/\d+$/);
    expect(item.videoUrl).toMatch(/^https:\/\//);
    expect(item.imageUrl).toMatch(/^https:\/\//);
    expect(Array.isArray(item.tags)).toBe(true);
    expect(item.tags!.length).toBeGreaterThan(0);
  }, 20000);

  it('scraping page', async() => {
    const storage = StorageFactory.getStorage();

    const ss:Scraper = dummySite1;
    const scraperService  = new ScrapingService(ss);
    await scraperService.scrapeMultiplePages(1, 2, true)
    const items = await storage.load()
    // console.log(data)
    items.forEach((item:Item) => {
      expect(item.title).not.toBe('');
      expect(item.imageUrl).toMatch(/^https:\/\//);
      expect(item.url).toMatch(/^https:\/\/4545\.to\/video\/play\/\d+$/);
      expect(item.videoUrl).toMatch(/^https:\/\//);
      expect(item.imageUrl).toMatch(/^https:\/\//);
      expect(Array.isArray(item.tags)).toBe(true);
      expect(item.tags!.length).toBeGreaterThan(0);
    })
    await storage.delete()
    await storage.close()
  }, 20000 * 10);
});