import { Item } from "../interface/Item";
import { Thumnail } from "../interface/Thumbnail";
import { Scraper } from "../interface/Scraper";

export const scrapers: Scraper[] = [
  // サイトA用スクレイパー
  {
    name: '4545動画',
    baseUrl: 'https://4545.to/latest',
    listPage: {
      url: (page: number) => `https://4545.to/latest/${page}`,
      extract: async ($: cheerio.Root): Promise<Thumnail[]> => {
        const thumbnails: Thumnail[] = [];
        
        // サイトAの動画一覧ページからアイテムを抽出
        $('.videoList article').each((_, element) => {
          const $el = $(element);
          const videoInfo = $('article > div');
          const titleElement = videoInfo.find('h3.change_h2_to_p > a');
          const thumbnailElement = videoInfo.find('figure > a > img');
          const urlElement = videoInfo.find('figure > a');

          if (titleElement.text() !== null) {
            thumbnails.push({
              title: titleElement.text(),
              thumbnail: thumbnailElement.attr('src')!,
              url: urlElement.attr('href')!
            });
          }
        });
        return thumbnails;
      }
    },
    detailPage: {
      extract: async ($: cheerio.Root, thumbnail:Thumnail): Promise<Item> => {
        
        const videoMainCnt = $('#videoMainCnt');
        const iframeSrc = videoMainCnt.find('#player iframe').attr('src');
        const tags = videoMainCnt.find('#videoInfo .tagList li a').map((i, el) => $(el).text()).get();

        const item: Item = {
          title: thumbnail.title, // 引数から取得
          url: thumbnail.url,     // 引数から取得
          videoUrl: iframeSrc,
          tags: tags,
          imageUrl: thumbnail.thumbnail
        };

        return item;
      }
    }
  }
];