import { IFacadeConsumerProps } from "./IFacadeConsumerProps";
import { NewsSource } from "../../models/NewsSource";
import { Grid, Switch } from "@material-ui/core";
import SourceChip from "./SourceChip";
import { INewsFacade } from "./INewsFacade";
import React from "react";
import { ISourceConsumerProps } from "./ISourceConsumerProps";

interface Props extends IFacadeConsumerProps, ISourceConsumerProps {
}

export default function SourceCheck(props: Props) {
  const { facade, source } = props;

  return (
    <Grid container direction="row">

      <Switch
        onChange={ (event: any, checked: boolean) => onSourceCheckClick(facade, source, checked) }/>

      <SourceChip source={ source }/>

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
