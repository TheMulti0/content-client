import React from "react";
import { NewsSource } from "../../models/NewsSource";
import { Box, Button } from "@material-ui/core";
import { EnumValues } from "enum-values";
import SourceCheck from "./SourceCheck";
import { INewsFacade } from "./INewsFacade";
import { ISourceControl } from "./ISourceControl";

interface Props {
  facade: INewsFacade
}

interface State {
  excludedSources: NewsSource[];
}

export default class SourceControl extends React.Component<Props, State> implements ISourceControl {

  constructor(props: Props) {
    super(props);

    this.state = {
      excludedSources: []
    }
  }

  public onSelectionChanged(
    source: NewsSource,
    checked: boolean
  ): void {

    const oldExcludedSources = this.state.excludedSources;
    let excludedSources: NewsSource[];

    if (checked) {
      excludedSources = oldExcludedSources.concat(source);
    } else {
      excludedSources = oldExcludedSources.filter(element => element !== source);
    }

    this.setState({ excludedSources });
  }

  render() {
    const sources = this.getNewsSources();

    return (
      <Box>
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
        <Button onClick={ this.submit.bind(this) }>Suybmit</Button>
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
    facade.fetchNews(this.state.excludedSources);
  }
}
