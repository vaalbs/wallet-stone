import { WalletOutlined } from "@ant-design/icons";
import React from "react";
import firebaseRef from "../../service/firebase";
import {
  LinkWrapper,
  Logo,
  MenuItem,
  MenuWrapper,
  SiderWrapper,
} from "./styled";

const logo = require("../../assets/images/logo.png");

interface IProps {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

export const SiderMenu = (props: IProps) => {
  const logout = () => {
    firebaseRef
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SiderWrapper
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
    >
      <Logo src={logo} collapsed={props.collapsed} />
      <MenuWrapper defaultSelectedKeys={["1"]} mode="inline">
        <MenuItem key="1">
          <LinkWrapper to="/carteira">
            <WalletOutlined />
            <span>Wallet</span>
          </LinkWrapper>
        </MenuItem>
        <MenuItem key="2" onClick={logout}>
          <LinkWrapper to="/sair">
            <span>Sair</span>
          </LinkWrapper>
        </MenuItem>
      </MenuWrapper>
    </SiderWrapper>
  );
};
