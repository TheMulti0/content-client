import { NewsSource } from "../../models/NewsSource";

export interface INewsFacade {
  resetItems(): void;

  fetchNews(excludedSources: NewsSource[]): void;
}
