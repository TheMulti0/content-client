import './News.css';
import React from 'react';

import { NewsService } from "../../services/NewsService";
import { INewsItem } from "../../models/INewsItem";
import NewsItem from "./NewsItem";
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';
import { NewsProviderType } from "../../models/NewsProviderType";

interface State {
  items: INewsItem[];
}

export default class News extends React.Component<any, State> {
  private newsService: NewsService;

  constructor(props: any) {
    super(props);

    this.newsService = new NewsService();
    this.state = { items: [] };
  }

  async componentDidMount() {
    const items: INewsItem[] = await this.newsService.getNews(10, [ NewsProviderType.MakoReporters ], [ NewsProviderType.KanNews ]);
    this.setState({ items })
  }

  render() {
    return (
      <div>

        <Backdrop className="backdrop" open={this.state.items.length === 0}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={2}>
          {
            this.state.items.map(GridNewsItem)
          }
        </Grid>

      </div>
    );

    function GridNewsItem(item: INewsItem, index: number) {
      return (
        <Grid item key={index}>
          <NewsItem item={item}/>
        </Grid>
      );
    }
  }
}
