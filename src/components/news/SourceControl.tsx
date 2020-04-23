import React from "react";
import { NewsSource } from "../../models/NewsSource";
import { Box, Button } from "@material-ui/core";
import SourceCheck from "./SourceCheck";
import { INewsFacade } from "./INewsFacade";
import { ISourceControl } from "./ISourceControl";
import { IQuery } from "./IQuery";

interface Props {
  facade: INewsFacade;
  availableSources: NewsSource[];
  defaultQuery: IQuery;
}

export default class SourceControl extends React.Component<Props, IQuery> implements ISourceControl {

  constructor(props: Props) {
    super(props);

    this.state = this.props.defaultQuery;
  }

  public onSelectionChanged(
    source: NewsSource,
    checked: boolean
  ): void {
    if (checked) {
      this.addToExcludedSources(source);
    } else {
      this.removeFromExcludedSources(source);
    }
  }

  private addToExcludedSources(source: NewsSource): void {
    const oldExcludedSources = this.state.excludedSources;
    const excludedSources: NewsSource[] = oldExcludedSources.concat(source);

    this.setState({ excludedSources });
  }

  private removeFromExcludedSources(source: NewsSource): void {
    const oldExcludedSources = this.state.excludedSources;
    const excludedSources: NewsSource[] = oldExcludedSources.filter(element => element !== source);

    this.setState({ excludedSources });
  }

  public getInitialState(source: NewsSource): boolean {
    return this.state.excludedSources.includes(source);
  }

  render() {
    const { availableSources } = this.props;

    return (
      <Box className="text-right">
        {
          availableSources.map((source, index) => {
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

  private submit() {
    const { facade } = this.props;
    facade.fetchNews(this.state);
  }
}
