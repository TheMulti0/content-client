import './Reports.css';
import React from 'react';

import { INewsItem } from "../../models/INewsItem";
import { Grid } from "@material-ui/core";
import Report from "./Report";

export default function Reports(props: { items: INewsItem[] }) {
  return (
    <Grid container direction="column" spacing={ 5 } className="reports text-right">
      {
        props.items.map(ReportItem)
      }
    </Grid>
  );


}

function ReportItem(item: INewsItem, index: number) {
  return (
    <Grid item key={ index }>
      <Report item={ item } />
    </Grid>
  );
}
