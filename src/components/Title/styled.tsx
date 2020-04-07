import { Breadcrumb } from "antd";
import styled from "styled-components";

export const BreadcrumbWrapper = styled(Breadcrumb)<{
  padding?: boolean;
  borderBottom?: boolean;
}>`
  border-bottom: ${(props) => (props.borderBottom ? "2px solid" : "0")};
  border-color: ${(props) => props.theme.color.grayLight};
  padding: ${(props) => (props.padding ? "60px 60px 0 60px" : "0 0 4px 0")};
`;

export const BreadcrumbItem = styled(Breadcrumb.Item)<{ fontSize?: string }>`
  color: ${(props) => props.theme.color.darkBlue};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: 600;
  text-transform: uppercase;
`;
