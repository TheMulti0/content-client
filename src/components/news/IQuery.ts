import { NewsSource } from "../../models/NewsSource";

export interface IQuery {
  excludedSources: NewsSource[];
  maxResults: number;
}
