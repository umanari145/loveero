import { Item } from "./Item";
import { Page } from "./Page";

export interface Scraper {
  name: string;
  baseUrl: string;
  listPage: {
    url: (page: number) => string;
    extract: (list: cheerio.Root) => Promise<Page[]>;
  };
  detailPage: {
    extract: (detail: cheerio.Root) => Promise<Item>
  };
}