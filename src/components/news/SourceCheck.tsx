import { Checkbox, Grid } from "@material-ui/core";
import SourceChip from "./SourceChip";
import React from "react";
import { ISourceConsumerProps } from "./ISourceConsumerProps";
import { ISourceControl } from "./ISourceControl";

interface Props extends ISourceConsumerProps {
  sourceControl: ISourceControl;
}

export default function SourceCheck(props: Props) {
  const { source, sourceControl } = props;

  return (
    <Grid container direction="row" alignItems="center">

      <Checkbox onChange={ (event: any, checked: boolean) => sourceControl.onSelectionChanged(source, checked) } />

      <SourceChip source={ source } />

    </Grid>
  );
}
