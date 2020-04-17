import './NewsItem.css';
import React from 'react';

import { Chip, Grid, ListItem, Typography } from "@material-ui/core";
import { INewsItem } from "../../models/INewsItem";
import { NewsSource } from "../../models/NewsSource";

interface Props {
  item: INewsItem;
  index: number;
}

interface SourceBadge {
  name: string;
  color: string;
}

export default class NewsItem extends React.Component<Props> {

  private newsSources: Map<NewsSource, SourceBadge> = new Map<NewsSource, SourceBadge>([
    [
      NewsSource.Mako,
      {
        name: 'מאקו',
        color: '#e83727'
      }
    ],
    [
      NewsSource.MakoReporters,
      {
        name: 'כתבי N12',
        color: '#e83727'
      }
    ],
    [
      NewsSource.KanNews,
      {
        name: 'כאן',
        color: '#616161'
      }
    ]
  ]);

  private item: INewsItem;
  private index: number;

  constructor(props: Props) {
    super(props);

    this.item = this.props.item;
    this.index = this.props.index;
  }

  render() {

    const badge = this.newsSources.get(this.item.source);

    return (
      <ListItem>

        <Grid container direction="column" spacing={ 1 } className="text-right">

          <Grid item container direction="row" alignItems="center">

            <img src={ this.item.author.imageUrl } className="avatar"/>

            <Typography variant="body2" color="textSecondary" className="author">
              { this.item.author.name }
            </Typography>

          </Grid>

          <Grid item container spacing={ 3 } justify="flex-end">

            <Grid item>
              <img src={ this.item.imageUrl } alt={ this.item.title } className="image"/>
            </Grid>

            <Grid item xs container direction="column" spacing={ 1 } className="text-right" justify="space-between">

              {
                badge !== undefined &&
                <Grid item>
                  <Chip
                    label={ badge.name }
                    style={{ backgroundColor: badge.color }} />
                </Grid>
              }


              <Grid item>
                <Typography gutterBottom variant="h6">
                  { this.item.title }
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body2" gutterBottom>

                  {
                    this.item.url != null &&
                    <a href={ this.item.url }>
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

        </Grid>

      </ListItem>
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
