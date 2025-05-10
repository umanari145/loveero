import { Item } from "@/interface/Item";
import { Scraper } from "@/interface/Scraper";
import { Thumbnail } from "@/interface/Thumbnail";

export const dummySite1: Scraper = {
  name: '4545動画',
  baseUrl: 'https://4545.to/latest',
  listPage: {
    url: (page: number) => `https://4545.to/latest/${page}`,
    extract: async ($: cheerio.Root): Promise<Thumbnail[]> => {
      const thumbnails: Thumbnail[] = [];
      // サイトAの動画一覧ページからアイテムを抽出
      $('.videoList article').each((_:number, element: cheerio.Element) => {
        const $el = $(element)
        const videoInfo = $('> div', $el);
        const titleElement = $('h3.change_h2_to_p > a', videoInfo).text();
        const thumbnailElement = $('figure > a > img', videoInfo);
        const urlElement = $('figure > a', videoInfo);
        if (titleElement !== '') {
          thumbnails.push({
            title: titleElement,
            thumbnail: thumbnailElement.attr('src')!,
            url: urlElement.attr('href')!
          });
        }
      });
      return thumbnails;
    }
  },
  detailPage: {
    extract: async ($: cheerio.Root, thumbnail:Thumbnail): Promise<Item> => {
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
};