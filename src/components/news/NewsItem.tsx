import './NewsItem.css';
import React from 'react';

import { Card, CardHeader, CardContent, Typography, CardMedia, Grid, Box, Divider, ListItem } from "@material-ui/core";
import { INewsItem } from "../../models/INewsItem";

interface Props {
  item: INewsItem;
  index: number;
}

export default class NewsItem extends React.Component<Props> {

  private item: INewsItem;
  private index: number;

  constructor(props: Props) {
    super(props);

    this.item = this.props.item;
    this.index = this.props.index;
  }

  render() {

    return (
      <ListItem>

        <Grid container spacing={ 3 } justify="flex-end" className="item">

          <Grid item>
            <img src={ this.item.imageUrl } alt={ this.item.title } className="image" />
          </Grid>

          <Grid item xs container direction="column" spacing={ 2 } className="text-right" justify="space-evenly">

            <Grid item>
              <Typography gutterBottom variant="h5">
                { this.item.title }
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body2" gutterBottom>

                { this.item.description }

                <br />

                {
                  this.item.url != null &&
                  <a href={this.item.url}>
                    לכתבה המלאה
                  </a>
                }


              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="caption" color="textSecondary">
                { this.getDate() }, בשעה { this.getTime() }
              </Typography>
            </Grid>

          </Grid>

        </Grid>

      </ListItem>
    );
  }

  getImageStyle(): any {
  }

  getDate(): string {
    const date = new Date(this.item.date);

    const now = new Date(Date.now());
    let today = now.getDay();

    const day = date.getDay();

    if (day === today) {
      return 'היום';
    }
    if (day === today - 1 || (day === 0 && today === 6)) {
      return 'אתמול';
    }

    return date.toLocaleDateString();
  }

  getTime(): string {
    const date = new Date(this.item.date);

    const minutes = date.getMinutes();
    let minutesString = minutes.toString();

    if (minutes < 10) {
      minutesString = `0${ minutesString }`;
    }

    return `${ date.getHours() }:${ minutesString }`
  }
}
