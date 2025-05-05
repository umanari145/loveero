import { Item } from "./Item";
import { Thumnail } from "./Thumbnail";

export interface Scraper {
  name: string;
  baseUrl: string;
  listPage: {
    url: (page: number) => string;
    extract: (list: cheerio.Root) => Promise<Thumnail[]>;
  };
  detailPage: {
    extract: (detail: cheerio.Root, thumbnail:Thumnail) => Promise<Item>
  };
}