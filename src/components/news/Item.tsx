import './Item.css';
import React from 'react';

import { Grid, Typography } from "@material-ui/core";
import { INewsItem } from "../../models/INewsItem";
import { IAuthor } from "../../models/IAuthor";
import SourceChip from './SourceChip';
import { DateFormatter } from "./DateFormatter";

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
    const image = item.imageUrl;

    return (
      <Grid container direction="column" spacing={ 1 } className="text-right">

        <Grid item container direction="row" alignItems="center">

          <img src={ author.imageUrl } className="avatar" alt={ authorName }/>

          <Typography variant="body2" color="textSecondary" className="author">
            { authorName }
          </Typography>

        </Grid>

        <Grid item container spacing={ 3 } justify="flex-start" className="content itemContainer">

          {
            image !== null &&
            <Grid item>
              <img src={ image } alt={ title } className="itemImage" />
            </Grid>
          }

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
                { DateFormatter.formatDateTime(date) }
              </Typography>
            </Grid>

          </Grid>

        </Grid>

      </Grid>
    );
  }
}
