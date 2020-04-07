import { SwapOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const ContentWrapper = styled(Content)`
  padding: 40px 60px 0 60px;
  position: relative;
`;

export const Line = styled.hr`
  border-top: 2px solid;
  border-top-color: ${(props) => props.theme.color.grayLight};
  border-left-color: ${(props) => props.theme.color.grayLight};
  position: absolute;
  top: 76px;
  width: calc(100% - 120px);
  z-index: -1;
`;

export const Button = styled.button`
  align-items: center;
  background-color: inherit;
  border: 0;
  color: ${(props) => props.theme.color.gray};
  cursor: pointer;
  display: flex;
  font-size: 11px;
  font-weight: 600;
  position: absolute;
  right: 0;
  text-transform: uppercase;
  top: 14px;

  &:hover {
    color: ${(props) => props.theme.color.purple};
  }
`;

export const Icon = styled(SwapOutlined)`
  margin-right: 8px;

  svg {
    height: 16px;
    width: 16px;
  }
`;
