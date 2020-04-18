import { IAuthor } from "./IAuthor";
import { NewsSource } from "./NewsSource";

export interface INewsItem {
  source: NewsSource;
  title: string;
  description: string;
  author: IAuthor;
  date: string;
  url: string;
  imageUrl: string;
  videoUrl: string;
}

