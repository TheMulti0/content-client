import './News.css';
import React from 'react';

import { NewsService } from "../../services/NewsService";
import { INewsItem } from "../../models/INewsItem";
import NewsItem from "./NewsItem";
import { Backdrop, Box, CircularProgress, Divider, Grid, List, Paper, Switch } from '@material-ui/core';
import { NewsSource } from "../../models/NewsSource";
import NewsSourceBadge from "./NewsSourceBadge";
import { EnumValues } from "enum-values";
import { Subscription } from "rxjs";

interface State {
  excludedSources: NewsSource[];
  itemsSubscription: Subscription;
  items: INewsItem[];
}

export default class News extends React.Component<any, State> {
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

  private fetchNews(excludedSources: NewsSource[] = this.state.excludedSources) {
    this.state.itemsSubscription?.unsubscribe();

    const itemsSubscription = this.newsService
      .getNews(50, excludedSources)
      .subscribe(this.onItemsArrived.bind(this), error => console.log(error));

    this.setState({ itemsSubscription });
  }

  private onItemsArrived(items: INewsItem[]) {
    this.setState({ items });
  }

  render() {
    const sources: NewsSource[] = this.getNewsSources()

    return (
      <Box>

        <Backdrop className="backdrop" open={ this.state.items.length === 0 }>
          <CircularProgress color="inherit"/>
        </Backdrop>

        <Grid container direction="row">

          <Grid item>
            <Paper>
              {
                sources.map((source, index) => {
                  return (
                    <Box key={ index }>
                      { this.NewsSourceCheck(source) }
                    </Box>
                  );
                })
              }
            </Paper>
          </Grid>

          <Grid item>
            <List className="news">
              {
                this.state.items.map((item, index) => {
                  return (
                    <Box key={ index }>
                      <NewsItem item={ item }/>
                      <br/>
                      <Divider/>
                      <br/>
                    </Box>
                  );
                })
              }
            </List>
          </Grid>

        </Grid>
      </Box>
    );
  }

  private getNewsSources() {
    return EnumValues
      .getValues<string>(NewsSource)
      .map(value => value as NewsSource);
  }

  private NewsSourceCheck(source: NewsSource) {
    return (
      <Grid item container direction="row">

        <Switch onChange={ ((event: any, checked: boolean) => this.onSourceCheckClick(source, checked)).bind(this) }/>

        <NewsSourceBadge source={ source }/>

      </Grid>
    );
  }

  private onSourceCheckClick(source: NewsSource, checked: boolean) {
    let excludedSources: NewsSource[];
    if (checked) {
      excludedSources = this.state.excludedSources.concat(source);
    } else {
      excludedSources = this.state.excludedSources.filter(element => element !== source);
    }
    this.setState({ excludedSources, items: [] });
    this.fetchNews(excludedSources);
  }
}
