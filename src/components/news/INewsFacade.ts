import { NewsSource } from "../../models/NewsSource";

export interface INewsFacade {
  getExcludedSources(): NewsSource[];

  resetItems(): void;

  fetchNews(excludedSources: NewsSource[]): void;
}
