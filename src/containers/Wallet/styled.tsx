import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const ContentWrapper = styled(Content)`
  padding: 60px 60px 0 60px;
  position: relative;
`;

export const Line = styled.hr`
  border-top: 2px solid;
  border-top-color: ${(props) => props.theme.color.grayLight};
  border-left-color: ${(props) => props.theme.color.grayLight};
  position: absolute;
  top: 96px;
  width: calc(100% - 120px);
`;
