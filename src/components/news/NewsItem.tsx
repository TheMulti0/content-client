import './NewsItem.css';
import React from 'react';

import { Chip, Grid, ListItem, Typography } from "@material-ui/core";
import { INewsItem } from "../../models/INewsItem";
import { NewsSource } from "../../models/NewsSource";
import { IAuthor } from "../../models/IAuthor";
import NewsSourceBadge from "./NewsSourceBadge";

interface Props {
  item: INewsItem;
}

interface SourceBadge {
  name: string;
  color: string;
}

export default class NewsItem extends React.Component<Props> {

  private readonly item: INewsItem;

  constructor(props: Props) {
    super(props);

    this.item = this.props.item;
  }

  render() {

    const item: INewsItem = this.item;
    const author: IAuthor = item.author;

    const title = item.title;
    const authorName = author.name;
    const url = item.url;

    return (
      <ListItem>

        <Grid container direction="column" spacing={ 1 } className="text-right">

          <Grid item container direction="row" alignItems="center">

            <img src={ author.imageUrl } className="avatar" alt={ authorName }/>

            <Typography variant="body2" color="textSecondary" className="author">
              { authorName }
            </Typography>

          </Grid>

          <Grid item container spacing={ 3 } justify="flex-end">

            <Grid item>
              <img src={ item.imageUrl } alt={ title } className="image"/>
            </Grid>

            <Grid item xs container direction="column" className="text-right" justify="space-between">

              <Grid item>
                <NewsSourceBadge source={ item.source } />
              </Grid>


              <Grid item>
                <Typography gutterBottom variant="h6">
                  { title }
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body2" gutterBottom>

                  {
                    url != null &&
                    <a href={ url }>
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
