class ScrapingService {
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
  public async scrapeListPage(page: number = 1): Promise<VideoListItem[]> {
    const url = this.scraper.listPage.url(page);
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);
    
    return this.scraper.listPage.extract($);
  }
  
  // 詳細ページをスクレイピング
  public async scrapeDetailPage(url: string): Promise<VideoDetail> {
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);
    
    return this.scraper.detailPage.extract($, url);
  }
  
  // 複数ページをスクレイピングして結果を保存
  public async scrapeMultiplePages(startPage: number, endPage: number, outputPath?: string): Promise<ScrapingResult> {
    const allVideos: VideoDetail[] = [];
    
    for (let page = startPage; page <= endPage; page++) {
      console.log(`Scraping page ${page} of ${this.scraper.name}...`);
      
      try {
        // 一覧ページをスクレイピング
        const videoItems = await this.scrapeListPage(page);
        console.log(`Found ${videoItems.length} videos on page ${page}`);
        
        // 各動画の詳細ページをスクレイピング
        for (const item of videoItems) {
          try {
            console.log(`Scraping details for "${item.title}" (${item.url})`);
            const videoDetail = await this.scrapeDetailPage(item.url);
            allVideos.push(videoDetail);
            
            // レート制限を回避するために少し待機
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          } catch (error) {
            console.error(`Error scraping video details for ${item.url}:`, error);
          }
        }
        
        // ページ間の待機時間
        await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 3000));
      } catch (error) {
        console.error(`Error scraping page ${page}:`, error);
      }
    }
    
    // 結果を構築
    const result: ScrapingResult = {
      site: this.scraper.name,
      timestamp: new Date().toISOString(),
      videos: allVideos
    };
    
    // 結果をファイルに保存（オプション）
    if (outputPath) {
      await this.saveResults(result, outputPath);
    }
    
    return result;
  }
  
  // 結果をJSONファイルとして保存
  private async saveResults(result: ScrapingResult, outputPath: string): Promise<void> {
    const fileName = `${result.site.replace(/\s+/g, '_')}_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const filePath = path.join(outputPath, fileName);
    
    try {
      // 出力ディレクトリが存在しない場合は作成
      await fs.mkdir(outputPath, { recursive: true });
      
      // 結果をJSONとして保存
      await fs.writeFile(filePath, JSON.stringify(result, null, 2), 'utf8');
      console.log(`Results saved to ${filePath}`);
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }
}