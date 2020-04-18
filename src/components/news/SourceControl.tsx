import React from "react";
import { NewsSource } from "../../models/NewsSource";
import { Paper } from "@material-ui/core";
import { EnumValues } from "enum-values";
import { IFacadeConsumerProps } from "./IFacadeConsumerProps";
import SourceCheck from "./SourceCheck";

export default function SourceControl(props: IFacadeConsumerProps) {
  const { facade } = props;
  const sources = getNewsSources();

  return (
    <Paper>
      {
        sources.map((source, index) => {
          return (
            <SourceCheck
              key={ index }
              facade={ facade }
              source={ source } />
          );
        })
      }
    </Paper>
  );
}

function getNewsSources() {
  return EnumValues
    .getValues<string>(NewsSource)
    .map(value => value as NewsSource);
}
