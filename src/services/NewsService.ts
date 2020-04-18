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

    const params = this.getParams(maxResults, excludedSources);

    return axios
      .get<INewsItem[]>(`${this.baseUrl}/news`, { params: params })
      .pipe(
        map(response => response.data))
  }

  private getParams(maxResults: number, excludedSources: NewsSource[]) {
    return {
      maxResults: maxResults,
      excludedSources: JSON.stringify(excludedSources)
    };
  }
}
