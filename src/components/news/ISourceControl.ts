import { NewsSource } from "../../models/NewsSource";

export interface ISourceControl {
  onSelectionChanged(source: NewsSource, state: boolean): void;
}
