
export const scrapers: Scraper[] = [
  // サイトA用スクレイパー
  {
    name: 'サイトA',
    baseUrl: 'https://example-site-a.com',
    listPage: {
      url: (page: number) => `https://example-site-a.com/videos?page=${page}`,
      extract: ($: CheerioStatic): VideoListItem[] => {
        const items: VideoListItem[] = [];
        
        // サイトAの動画一覧ページからアイテムを抽出
        $('.video-item').each((_, element) => {
          const $el = $(element);
          const id = $el.attr('data-id') || '';
          const title = $el.find('.video-title').text().trim();
          const thumbnail = $el.find('.thumbnail img').attr('src');
          const url = $el.find('a').attr('href') || '';
          
          items.push({
            id,
            title,
            thumbnail,
            url: url.startsWith('http') ? url : `https://example-site-a.com${url}`
          });
        });
        
        return items;
      }
    },
    detailPage: {
      extract: async ($: CheerioStatic, url: string): Promise<VideoDetail> => {
        // サイトAの動画詳細ページから情報を抽出
        const id = url.split('/').pop() || '';
        const title = $('.video-title').text().trim();
        const description = $('.video-description').text().trim();
        const duration = $('.video-duration').text().trim();
        const uploadDate = $('.upload-date').text().trim();
        
        const tags: string[] = [];
        $('.tags .tag').each((_, el) => {
          tags.push($(el).text().trim());
        });
        
        const videoUrl = $('.video-player source').attr('src');
        const thumbnailUrl = $('.video-player').attr('poster');
        
        return {
          id,
          title,
          description,
          duration,
          uploadDate,
          tags,
          videoUrl,
          thumbnailUrl
        };
      }
    }
  },
  
  // サイトB用スクレイパー
  {
    name: 'サイトB',
    baseUrl: 'https://example-site-b.com',
    listPage: {
      url: (page: number) => `https://example-site-b.com/browse/page-${page}`,
      extract: ($: CheerioStatic): VideoListItem[] => {
        const items: VideoListItem[] = [];
        
        // サイトBの動画一覧ページからアイテムを抽出
        $('div.video-block').each((_, element) => {
          const $el = $(element);
          const id = $el.attr('data-video-id') || '';
          const title = $el.find('h3.video-name').text().trim();
          const thumbnail = $el.find('.thumb-overlay img').attr('data-src');
          const url = $el.find('a.video-link').attr('href') || '';
          
          items.push({
            id,
            title,
            thumbnail,
            url: url.startsWith('http') ? url : `https://example-site-b.com${url}`
          });
        });
        
        return items;
      }
    },
    detailPage: {
      extract: async ($: CheerioStatic, url: string): Promise<VideoDetail> => {
        // サイトBの動画詳細ページから情報を抽出
        const id = $('meta[property="og:video:id"]').attr('content') || url.split('-').pop() || '';
        const title = $('h1.video-title').text().trim();
        const description = $('div.video-description').text().trim();
        const duration = $('span.duration-view').first().text().trim();
        const uploadDate = $('span.upload-date').text().trim();
        
        const tags: string[] = [];
        $('div.categories-tags a.tag').each((_, el) => {
          tags.push($(el).text().trim());
        });
        
        const videoUrl = $('video#player-html5 source').attr('src');
        const thumbnailUrl = $('meta[property="og:image"]').attr('content');
        
        return {
          id,
          title,
          description,
          duration,
          uploadDate,
          tags,
          videoUrl,
          thumbnailUrl
        };
      }
    }
  }
];