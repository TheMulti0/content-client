import './Item.css';
import React from 'react';

import { Grid, ListItem, Typography } from "@material-ui/core";
import { INewsItem } from "../../models/INewsItem";
import { IAuthor } from "../../models/IAuthor";
import SourceChip from './SourceChip';

interface Props {
  item: INewsItem;
}

export default class Item extends React.Component<Props> {

  render() {

    const item: INewsItem = this.props.item;
    const author: IAuthor = item.author;

    const title = item.title;
    const authorName = author.name;
    const url = item.url;
    const date = new Date(item.date);

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
                <SourceChip source={ item.source } />
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
                  { this.getDate(date) }, בשעה { this.getTime(date) }
                </Typography>
              </Grid>

            </Grid>

          </Grid>

        </Grid>

      </ListItem>
    );
  }

  getDate(date: Date): string {
    // TODO Make sure item.date and date.now share the same year, month, week

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

  getTime(date: Date): string {
    const minutes = date.getMinutes();
    let minutesString = minutes.toString();

    if (minutes < 10) {
      minutesString = `0${ minutesString }`;
    }

    return `${ date.getHours() }:${ minutesString }`
  }
}
