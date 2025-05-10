import { Item } from "./Item";
import { Thumbnail } from "./Thumbnail";

export interface Scraper {
  name: string;
  baseUrl: string;
  listPage: {
    url: (page: number) => string;
    extract: (list: cheerio.Root) => Promise<Thumbnail[]>;
  };
  detailPage: {
    extract: (detail: cheerio.Root, thumbnail:Thumbnail) => Promise<Item>
  };
}