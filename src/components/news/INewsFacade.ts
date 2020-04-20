import { NewsSource } from "../../models/NewsSource";

export interface INewsFacade {
  getExcludedSources(): NewsSource[];

  addToExcludedSources(source: NewsSource): void;
  removeFromExcludedSources(source: NewsSource): void;

  resetItems(): void;

  fetchNews(): void;
}
