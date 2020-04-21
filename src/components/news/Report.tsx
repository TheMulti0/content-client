import './Report.css';
import React from 'react';

import { INewsItem } from "../../models/INewsItem";
import { Grid, Typography } from "@material-ui/core";

export default function Report(props: { item: INewsItem }) {
  const { item } = props;

  const title = item.title;
  const image = item.imageUrl;

  const author = item.author;
  const authorName = author.name;

  return (
    <Grid container direction="column" spacing={ 1 }>

      <Grid item container direction="row" alignItems="center">

        <img src={ author.imageUrl } className="avatar" alt={ authorName } />

        <Typography variant="body2" color="textSecondary" className="author">
          { authorName }
        </Typography>

      </Grid>

      <Grid item>

        <Typography>
          { title }
        </Typography>

      </Grid>

      {
        image !== null &&
        <Grid item>
          <img src={ image } alt={ title } className="image" />
        </Grid>
      }

    </Grid>

  );
}
