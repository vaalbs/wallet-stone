import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const { Sider } = Layout;

export const Logo = styled.img<{ collapsed: boolean }>`
  display: flex;
  margin: 0 auto 16px auto;
  width: ${(props) => (props.collapsed ? "80px" : "120px")};
`;

export const LinkWrapper = styled(Link)`
  color: inherit !important;
`;

export const SiderWrapper = styled(Sider)`
  background-color: ${(props) => props.theme.color.primary};
  min-height: 100vh;
  padding-top: 16px;
`;

export const MenuWrapper = styled(Menu)`
  background-color: inherit;
  border-right: 0;

  &:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: inherit;
    border-left: 2px solid;
    border-right-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.secondary};
  }
`;

export const MenuItem = styled(Menu.Item)`
  border-left: 2px solid;
  border-left-color: transparent;
  color: ${(props) => props.theme.color.gray};
  font-weight: 600;
  padding-top: 4px;

  &:hover {
    color: ${(props) => props.theme.color.secondary};
  }

  &::after {
    border-right: 0 !important;
  }
`;
