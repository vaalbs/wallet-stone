import { LineChartOutlined, WalletOutlined } from "@ant-design/icons";
import React from "react";
import { Logo, MenuItem, MenuWrapper, SiderWrapper } from "./styled";

const logo = require("../../assets/images/logo.png");

interface IProps {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

export const SiderMenu = (props: IProps) => {
  return (
    <SiderWrapper
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
    >
      <Logo src={logo} collapsed={props.collapsed} />
      <MenuWrapper defaultSelectedKeys={["1"]} mode="inline">
        <MenuItem key="1">
          <LineChartOutlined />
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem key="2">
          <WalletOutlined />
          <span>Wallet</span>
        </MenuItem>
      </MenuWrapper>
    </SiderWrapper>
  );
};
