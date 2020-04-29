import './News.css';
import React from 'react';

import { NewsService } from "../../services/NewsService";
import { INewsItem } from "../../models/INewsItem";
import { Backdrop, Box, CircularProgress, Grid } from '@material-ui/core';
import { NewsSource } from "../../models/NewsSource";
import { Subscription } from "rxjs";
import { INewsFacade } from "./INewsFacade";
import SourceControl from "./SourceControl";
import Items from './Items';
import Reports from "./Reports";
import { EnumValues } from "enum-values";
import { IQuery } from "./IQuery";

interface NewsConsumerState {
  lastQuery: IQuery;
  itemsSubscription: Subscription;
  items: INewsItem[];
  reports: INewsItem[];
}

export default class News extends React.Component<any, NewsConsumerState> implements INewsFacade {
  private newsService: NewsService;
  private reportsSources: NewsSource[] = [
    NewsSource.MakoReporters,
    NewsSource.YnetReports,
    NewsSource.CalcalistReports
  ];
  private newsSources = this.getNewsSources();

  constructor(props: any) {
    super(props);

    this.newsService = new NewsService();

    const defaultQuery: IQuery = {
      excludedSources: this.reportsSources,
      maxResults: 10
    };

    this.state = {
      lastQuery: defaultQuery,
      itemsSubscription: new Subscription(),
      items: [],
      reports: []
    };
  }

  componentDidMount() {
    this.fetchNews(this.state.lastQuery);
    this.fetchReports();
  }

  private resetItems(): void {
    this.setState({ items: [] });
  }

  public fetchNews(query: IQuery) {
    this.resetItems();
    this.state.itemsSubscription?.unsubscribe();

    const itemsSubscription = this.newsService
      .getNews(query.maxResults, query.excludedSources)
      .subscribe(
        this.onItemsArrived.bind(this),
        error => console.log(error));

    this.setState({ itemsSubscription, lastQuery: query });
  }

  private fetchReports() {
    this.newsService
      .getNews(
        this.state.lastQuery.maxResults,
        this.newsSources)
      .subscribe(
        reports => this.setState({ reports }),
        error => console.log(error));
  }

  private onItemsArrived(items: INewsItem[]) {
    this.setState({ items });
  }

  render() {
    const areThereItems = this.state.items.length > 0;

    return (
      <Box className="p-2">

        <Backdrop className="backdrop" open={ !areThereItems }>
          <CircularProgress color="inherit" />
        </Backdrop>

        {
          areThereItems &&
          <Grid container direction="row" justify={ "space-between" }>

            <Grid item>
              <SourceControl facade={ this }
                             availableSources={ this.newsSources }
                             defaultQuery={ this.state.lastQuery } />
            </Grid>

            <Grid item>
              <Items items={ this.state.items } />
            </Grid>

            <Grid item className="pl-2">
              <Reports items={ this.state.reports } />
            </Grid>

          </Grid>
        }

      </Box>
    );
  }

  private getAllNewsSources() {
    return EnumValues
      .getValues<string>(NewsSource)
      .map(value => value as NewsSource);
  }

  private getNewsSources() {
    return this.getAllNewsSources()
      .filter(source => !this.reportsSources.includes(source));
  }
}
