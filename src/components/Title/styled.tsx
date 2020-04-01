import { Breadcrumb } from "antd";
import styled from "styled-components";

export const BreadcrumbItem = styled(Breadcrumb.Item)`
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;
