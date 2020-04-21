import React from "react";
import { NewsSource } from "../../models/NewsSource";
import { Box, Button } from "@material-ui/core";
import { EnumValues } from "enum-values";
import SourceCheck from "./SourceCheck";
import { INewsFacade } from "./INewsFacade";
import { ISourceControl } from "./ISourceControl";

interface Props {
  facade: INewsFacade;
}

export default class SourceControl extends React.Component<Props> implements ISourceControl {

  public onSelectionChanged(
    source: NewsSource,
    checked: boolean
  ): void {

    const { facade } = this.props;

    if (checked) {
      facade.addToExcludedSources(source);
    } else {
      facade.removeFromExcludedSources(source);
    }
  }

  public getInitialState(source: NewsSource): boolean {
    return this.props.facade.getExcludedSources().includes(source);
  }

  render() {
    const sources = this.getNewsSources();

    return (
      <Box className="text-right">
        {
          sources.map((source, index) => {
            return (
              <SourceCheck
                key={ index }
                sourceControl={ this }
                source={ source } />
            );
          })
        }
        <Box className="pr-2">
          <Button onClick={ this.submit.bind(this) }>רענן</Button>
        </Box>
      </Box>
    );
  }

  private getNewsSources() {
    return EnumValues
      .getValues<string>(NewsSource)
      .map(value => value as NewsSource);
  }

  private submit() {
    const { facade } = this.props;
    facade.resetItems();
    facade.fetchNews();
  }
}
