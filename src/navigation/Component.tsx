import React from "react";
import { IRouteMappingProps } from "../models/IRouteMappingProps";

export default function Component(props: IRouteMappingProps) {
  const { mapping } = props;
  return (
    <mapping.component
      mappings={mapping.mappings}
      {...props} />
  );
}
