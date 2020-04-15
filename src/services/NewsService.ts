import { INewsItem } from "../models/INewsItem";
import { NewsProviderType } from "../models/NewsProviderType";
import { RestClient } from "typed-rest-client/RestClient";

export class NewsService {
  private readonly baseUrl = 'http://localhost:5000';
  private readonly rest: RestClient;

  constructor() {
    this.rest = new RestClient(null, this.baseUrl);
  }

  getNews(
    maxResults: number,
    includedTypes: NewsProviderType[],
    excludedTypes: NewsProviderType[]
  ): Promise<INewsItem[]> {

    const params = this.getParams(
      maxResults,
      includedTypes,
      excludedTypes);

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
    includedTypes: NewsProviderType[],
    excludedTypes: NewsProviderType[]
  ) {
    let params: { [name: string]: any } = {};

    params['maxResults'] = maxResults;
    params['includedTypes'] = this.toValues(includedTypes)
    params['excludedTypes'] = this.toValues(excludedTypes)

    return params;
  }

  toValues(providerTypes: NewsProviderType[]) {
    const items: string[] = [];
    for (let i of providerTypes) {
      items.push(NewsProviderType[i]);
    }
    return items;
  }
}
