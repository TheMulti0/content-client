import { Box, Divider, List, ListItem } from "@material-ui/core";
import React from "react";
import { INewsItem } from "../../models/INewsItem";
import Item from "./Item";

export default function Items(props: { items: INewsItem[] }) {
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

      <ListItem>
        <Item item={ item }/>
      </ListItem>

      <br/>
      <Divider/>
      <br/>

    </Box>
  );
}
