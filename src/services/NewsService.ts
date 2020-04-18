import axios, { AxiosResponse } from 'axios';
import { INewsItem } from "../models/INewsItem";
import { NewsSource } from "../models/NewsSource";

export class NewsService {
  private readonly baseUrl = 'http://localhost:5000';

  getNews(
    maxResults: number,
    excludedSources: NewsSource[]
  ): Promise<INewsItem[]> {

    const params = this.getParams(
      maxResults,
      excludedSources);

    return axios
      .get<INewsItem[]>(`${this.baseUrl}/news`, { params })
      .then((value: AxiosResponse<INewsItem[]>) => value.data);
  }

  private getParams(
    maxResults: number,
    excludedSources: NewsSource[]
  ) {
    let params: { [name: string]: any } = {};

    params['maxResults'] = maxResults;
    params['excludedSources'] = this.toValues(excludedSources);

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
