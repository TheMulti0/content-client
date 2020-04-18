import axios  from 'axios-observable';
import { INewsItem } from "../models/INewsItem";
import { NewsSource } from "../models/NewsSource";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

export class NewsService {
  private readonly baseUrl = 'http://localhost:5000';

  getNews(
    maxResults: number,
    excludedSources: NewsSource[]
  ): Observable<INewsItem[]> {

    const params = NewsService.getParams(
      maxResults,
      excludedSources);

    return axios
      .get<INewsItem[]>(`${this.baseUrl}/news`, { params, headers: {'Content-Type': 'application/json'} })
      .pipe(map(response => response.data))
  }

  private static getParams(
    maxResults: number,
    excludedSources: NewsSource[]
  ) {
    let params: { [name: string]: any } = {};

    params['maxResults'] = maxResults;
    params['excludedSources'] = JSON.stringify(excludedSources);

    return params;
  }
}
