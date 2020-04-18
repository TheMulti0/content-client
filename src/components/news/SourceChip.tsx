import React from 'react';

import { Chip } from "@material-ui/core";
import { NewsSource } from "../../models/NewsSource";
import { SourceBadge } from "../../models/SourceBadge";
import { ISourceConsumerProps } from "./ISourceConsumerProps";

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

export default function SourceChip(props: ISourceConsumerProps) {

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
