import React from "react";
import { BreadcrumbItem, BreadcrumbWrapper } from "./styled";

interface IProps {
  title: string;
  fontSize?: string;
  padding?: boolean;
  borderBottom?: boolean;
}

export const Title = ({
  title,
  fontSize,
  padding = true,
  borderBottom,
}: IProps) => {
  return (
    <BreadcrumbWrapper padding={padding} borderBottom={borderBottom}>
      <BreadcrumbItem fontSize={fontSize}>{title}</BreadcrumbItem>
    </BreadcrumbWrapper>
  );
};
