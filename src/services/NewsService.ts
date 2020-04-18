import axios, { AxiosResponse } from 'axios';
import { INewsItem } from "../models/INewsItem";
import { NewsSource } from "../models/NewsSource";
import { EnumValues } from "enum-values";

export class NewsService {
  private readonly baseUrl = 'http://localhost:5000';

  getNews(
    maxResults: number,
    excludedSources: NewsSource[]
  ): Promise<INewsItem[]> {

    const params = NewsService.getParams(
      maxResults,
      excludedSources);

    return axios
      .get<INewsItem[]>(`${this.baseUrl}/news`, { params })
      .then((value: AxiosResponse<INewsItem[]>) => value.data);
  }

  private static getParams(
    maxResults: number,
    excludedSources: NewsSource[]
  ) {
    let params: { [name: string]: any } = {};

    params['maxResults'] = maxResults;
    params['excludedSources'] = excludedSources;

    return params;
  }
}
