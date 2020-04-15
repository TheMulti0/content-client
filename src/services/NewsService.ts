import { INewsItem } from "../models/INewsItem";
import { NewsProviderType } from "../models/NewsProviderType";
import { RestClient } from "typed-rest-client/RestClient";

export class NewsService {
  private readonly baseUrl = 'http://localhost:5000';
  private readonly rest: RestClient;

  constructor() {
    this.rest = new RestClient(null, this.baseUrl);
  }

  getNews(...providerTypes: NewsProviderType[]): Promise<INewsItem[]> {

    let params = this.getParams(providerTypes);

    return this.rest
      .get<INewsItem[]>('/news', { queryParameters: { params } })
      .then(value => {
        if (value.result === null) {
          return [];
        }
        return value.result;
      })
  }

  private getParams(providerTypes: NewsProviderType[]) {
    let params: { [name: string]: string[] } = {};

    params['providerTypes'] = this.toValues(providerTypes)

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
