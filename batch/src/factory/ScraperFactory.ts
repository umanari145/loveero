class ScraperFactory {
    static getScraper(siteName: string): Scraper | undefined {
      return scrapers.find(scraper => scraper.name === siteName);
    }
    
    static getAllScrapers(): Scraper[] {
      return scrapers;
    }
    
    // 新しいスクレイパー定義を追加するためのメソッド
    static registerScraper(scraper: Scraper): void {
      scrapers.push(scraper);
    }
  }
  