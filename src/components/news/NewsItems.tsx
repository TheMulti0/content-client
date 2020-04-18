import { Box, Divider, List } from "@material-ui/core";
import React from "react";
import { INewsItem } from "../../models/INewsItem";
import NewsItem from "./NewsItem";

export default function NewsItems(props: { items: INewsItem[] }) {
  const { items } = props;

  return (
    <List className="news">
      {
        items.map(StyledNewsItem)
      }
    </List>
  );
}

function StyledNewsItem(item: INewsItem, index: number) {
  return (
    <Box key={ index }>
      <NewsItem item={ item }/>
      <br/>
      <Divider/>
      <br/>
    </Box>
  );
}
