import './News.css';
import React from 'react';

import { NewsService } from "../../services/NewsService";
import { INewsItem } from "../../models/INewsItem";
import NewsItem from "./NewsItem";
import { Backdrop, Box, CircularProgress, Divider, Grid, List } from '@material-ui/core';
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
    const items: INewsItem[] = await this.newsService.getNews(50, [ NewsProviderType.MakoReporters ]);
    this.setState({ items })
  }

  render() {
    return (
      <div>

        <Backdrop className="backdrop" open={this.state.items.length === 0}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <List className="news" >
          {
            this.state.items.map((item, index) => {
              return (
                <NewsItem item={ item } key={ index } index={ index } />
              );
            })
          }
        </List>


      </div>
    );
  }
}
