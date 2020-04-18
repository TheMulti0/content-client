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

interface NewsConsumerState {
  excludedSources: NewsSource[];
  itemsSubscription: Subscription;
  items: INewsItem[];
}

export default class News extends React.Component<any, NewsConsumerState> implements INewsFacade {
  private newsService: NewsService;

  constructor(props: any) {
    super(props);

    this.newsService = new NewsService();

    this.state = {
      excludedSources: [],
      itemsSubscription: new Subscription(),
      items: []
    };
  }

  componentDidMount() {
    this.fetchNews([]);
  }

  public getExcludedSources(): NewsSource[] {
    return this.state.excludedSources;
  }

  public resetItems(): void {
    this.setState({ items: [] });
  }

  public fetchNews(excludedSources: NewsSource[]) {
    this.state.itemsSubscription?.unsubscribe();

    const itemsSubscription = this.newsService
      .getNews(50, excludedSources)
      .subscribe(
        this.onItemsArrived.bind(this),
        error => console.log(error));

    this.setState({ itemsSubscription });
  }

  private onItemsArrived(items: INewsItem[]) {
    this.setState({ items });
  }

  render() {
    return (
      <Box>

        <Backdrop className="backdrop" open={ this.state.items.length === 0 }>
          <CircularProgress color="inherit"/>
        </Backdrop>

        <Grid container direction="row">

          <Grid item>
            <SourceControl facade={ this }/>
          </Grid>

          <Grid item>
            <Items items={ this.state.items }/>
          </Grid>

        </Grid>
      </Box>
    );
  }
}
