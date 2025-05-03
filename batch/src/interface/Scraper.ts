import { Cheerio } from "cheerio";

export interface Scraper {
  name: string;
  baseUrl: string;
  listPage: {
    url: (page: number) => string;
  };
  detailPage: {

  };
}