import { Box, Divider, Grid, } from "@material-ui/core";
import React from "react";
import { INewsItem } from "../../models/INewsItem";
import Item from "./Item";

export default function Items(props: { items: INewsItem[] }) {
  const { items } = props;

  return (
    <Grid container direction="column" spacing={ 5 } className="news">
      {
        items.map(NewsItem)
      }
    </Grid>
  );
}

function NewsItem(item: INewsItem, index: number) {
  return (
    <Box key={ index }>

      <Item item={ item }/>

      <br/>
      <Divider/>
      <br/>

    </Box>
  );
}
