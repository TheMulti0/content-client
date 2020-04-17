import { IAuthor } from "./IAuthor";
import { NewsProviderType } from "./NewsProviderType";

export interface INewsItem {
  source: NewsProviderType;
  title: string;
  description: string;
  author: IAuthor;
  date: string;
  url: string;
  imageUrl: string;
  videoUrl: string;
}

