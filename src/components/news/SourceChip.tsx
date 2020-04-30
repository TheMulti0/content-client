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
    NewsSource.Kan,
    {
      name: 'כאן',
      color: '#616161'
    }
  ],
  [
    NewsSource.Ynet,
    {
      name: 'ynet',
      color: '#CC0000'
    }
  ],
  [
    NewsSource.YnetReports,
    {
      name: 'מבזקי ynet',
      color: '#CC0000'
    }
  ],
  [
    NewsSource.Calcalist,
    {
      name: 'כלכליסט',
      color: '#D01E25'
    }
  ],
  [
    NewsSource.CalcalistReports,
    {
      name: 'מבזקי כלכליסט',
      color: '#D01E25'
    }
  ],
  [
    NewsSource.Walla,
    {
      name: 'וואלה! חדשות',
      color: '#24a1f4'
    }
  ],
  [
    NewsSource.WallaReports,
    {
      name: 'וואלה! מבזקים',
      color: '#24a1f4'
    }
  ],
  [
    NewsSource.Haaretz,
    {
      name: 'הארץ',
      color: '#006382'
    }
  ],
  [
    NewsSource.TheMarker,
    {
      name: 'TheMarker',
      color: '#00C800'
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
