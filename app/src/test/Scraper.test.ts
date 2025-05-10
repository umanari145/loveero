import { Scraper } from "@/interface/Scraper";
import { dummySite1 } from "../scrapers/dummySite1";
import { ScrapingService } from "../service/ScraperService";
// なぜか@だとよみこめないmoduleあり

describe('Scraper', () => {
  it('constructor起動', () => {
    const ss:Scraper = dummySite1;
    const scraperService  = new ScrapingService(ss);
    const ans1 = scraperService.sum(1,2)
    expect(ans1).toBe(3);
  });

  it('scraping', async() => {
    const ss:Scraper = dummySite1;
    const scraperService  = new ScrapingService(ss);
    const res = await scraperService.scrapeListPage(1)
    expect(res.length).toBeGreaterThanOrEqual(1);
    // resをループして各プロパティの検証
    res.forEach((item) => {
      expect(item.title).not.toBe('');
      expect(item.thumbnail).not.toBe('');
      expect(item.url).toMatch(/^video\/play\/\d+$/);
    })
  }, 20000);
});