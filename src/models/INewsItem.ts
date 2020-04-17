import { IAuthor } from "./IAuthor";
import { NewsSource } from "./NewsProviderType";

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

