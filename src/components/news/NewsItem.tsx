import './NewsItem.css';
import React from 'react';

import { Card, CardHeader, CardContent, Typography, CardMedia, Grid } from "@material-ui/core";
import { INewsItem } from "../../models/INewsItem";

interface Props {
  item: INewsItem;
  index: number;
}

export default class NewsItem extends React.Component<Props> {

  private item: INewsItem;
  private index: number;
  private spacing: any;
  private style: any;

  constructor(props: Props) {
    super(props);

    this.item = this.props.item;
    this.index = this.props.index;

    if (this.index === 0) {
      this.spacing = 12;
    }
    else if (this.index === 1 || this.index === 2) {
      this.spacing = 6;
    }
    else {
      this.spacing = "auto";
      this.style = {
        width: '250pt',
        maxWidth: '600pt',
        maxHeight: '600pt'
      }
    }
  }

  render() {

    return (
      <Grid item sm={this.spacing} style={this.style} className="card">
        <Card
              variant="elevation">

          <CardHeader
            avatar={ <img src={ this.item.author.imageUrl } alt=""/> }
            title={ this.item.author.name }/>

          <Typography className="date" color="textSecondary" variant="h6">
            { this.getDate() }, בשעה { this.getTime() }
          </Typography>

          <CardContent>

            <Typography className="content">
              { this.item.description }

              <br/>

              {
                this.item.url !== null
                &&
                <a href={ this.item.url }>
                  לכתבה המלאה
                </a>
              }

            </Typography>

          </CardContent>

          {
            this.item.imageUrl !== null &&
            <CardMedia
              style={ { height: 0, paddingTop: '56.25%' } }
              image={ this.item.imageUrl }/>
          }

        </Card>
      </Grid>
    );
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
