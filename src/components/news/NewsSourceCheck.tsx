import { IFacadeConsumerProps } from "./IFacadeConsumerProps";
import { NewsSource } from "../../models/NewsSource";
import { Grid, Switch } from "@material-ui/core";
import NewsSourceBadge from "./NewsSourceBadge";
import { INewsFacade } from "./INewsFacade";
import React from "react";

interface Props extends IFacadeConsumerProps {
  source: NewsSource
}

export default function NewsSourceCheck(props: Props) {
  const { facade, source } = props;

  return (
    <Grid container direction="row">

      <Switch
        onChange={ (event: any, checked: boolean) => onSourceCheckClick(facade, source, checked) }/>

      <NewsSourceBadge source={ source }/>

    </Grid>
  );
}

function onSourceCheckClick(
  facade: INewsFacade,
  source: NewsSource,
  checked: boolean
) {
  const oldExcludedSources = facade.getExcludedSources();
  let excludedSources: NewsSource[];

  if (checked) {
    excludedSources = oldExcludedSources.concat(source);
  } else {
    excludedSources = oldExcludedSources.filter(element => element !== source);
  }

  facade.resetItems(); // Remove current items, show the loading icon
  facade.fetchNews(excludedSources);
}
