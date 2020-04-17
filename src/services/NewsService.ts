import { INewsItem } from "../models/INewsItem";
import { RestClient } from "typed-rest-client/RestClient";
import { NewsSource } from "../models/NewsSource";

export class NewsService {
  private readonly baseUrl = 'http://localhost:5000';
  private readonly rest: RestClient;

  constructor() {
    this.rest = new RestClient(null, this.baseUrl);
  }

  getNews(
    maxResults: number,
    excludedSources: NewsSource[]
  ): Promise<INewsItem[]> {

    const params = this.getParams(
      maxResults,
      excludedSources);

    return this.rest
      .get<INewsItem[]>('/news', { queryParameters: { params } })
      .then(value => {
        if (value.result === null) {
          return [];
        }
        return value.result;
      })
  }

  private getParams(
    maxResults: number,
    excludedSources: NewsSource[]
  ) {
    let params: { [name: string]: any } = {};

    params['maxResults'] = maxResults;
    params['excludedSources'] = this.toValues(excludedSources)

    return params;
  }

  toValues(providerTypes: NewsSource[]) {
    const items: string[] = [];
    for (let i of providerTypes) {
      items.push(NewsSource[i]);
    }
    return items;
  }
}
