import './NewsItem.css';
import React from 'react';

import { Chip, Grid, ListItem, Typography } from "@material-ui/core";
import { INewsItem } from "../../models/INewsItem";
import { NewsSource } from "../../models/NewsSource";
import { IAuthor } from "../../models/IAuthor";

interface Props {
  item: INewsItem;
}

interface SourceBadge {
  name: string;
  color: string;
}

const newsSourceBadges: Map<NewsSource, SourceBadge> = new Map<NewsSource, SourceBadge>([
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

export default function NewsSourceBadge(props: { source: NewsSource }) {

  const badge: SourceBadge | undefined = newsSourceBadges.get(props.source);
  if (badge === undefined) {
    return null;
  }

  return (
      <Chip
        label={ badge.name }
        style={ { backgroundColor: badge.color, color: '#ffffff' } }/>
  );
}
