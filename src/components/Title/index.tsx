import { Breadcrumb } from "antd";
import React from "react";
import { BreadcrumbItem } from "./styled";

interface IProps {
  title: string;
}

export const Title = (props: IProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>{props.title}</BreadcrumbItem>
    </Breadcrumb>
  );
};
