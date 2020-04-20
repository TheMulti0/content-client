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
    this.fetchNews();
  }

  public getExcludedSources(): NewsSource[] {
    return this.state.excludedSources;
  }

  public addToExcludedSources(source: NewsSource): void {
    const oldExcludedSources = this.state.excludedSources;
    const excludedSources: NewsSource[] = oldExcludedSources.concat(source);

    this.setState({ excludedSources });
  }

  public removeFromExcludedSources(source: NewsSource): void {
    const oldExcludedSources = this.state.excludedSources;
    const excludedSources: NewsSource[] = oldExcludedSources.filter(element => element !== source);

    this.setState({ excludedSources });
  }

  public resetItems(): void {
    this.setState({ items: [] });
  }

  public fetchNews() {
    this.state.itemsSubscription?.unsubscribe();

    const itemsSubscription = this.newsService
      .getNews(10, this.state.excludedSources)
      .subscribe(
        this.onItemsArrived.bind(this),
        error => console.log(error));

    this.setState({ itemsSubscription });
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
          <Grid container direction="row" spacing={ 2 }>

            <Grid item>
              <SourceControl facade={ this } />
            </Grid>

            <Grid item>
              <Items items={ this.state.items } />
            </Grid>

          </Grid>
        }

      </Box>
    );
  }
}
