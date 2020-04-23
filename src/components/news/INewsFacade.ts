import { IQuery } from "./IQuery";

export interface INewsFacade {
  fetchNews(query: IQuery): void;
}
