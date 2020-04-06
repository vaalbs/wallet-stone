import { Layout } from "antd";
import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SiderMenu } from "../../components/Sider-Menu";
import { WalletComponent } from "../Wallet";
import { GlobalStyle } from "./styled";

export const Main = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout>
      <SiderMenu
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      />
      <Layout className="site-layout">
        <Header />
        <GlobalStyle />
        <WalletComponent />

        <Footer />
      </Layout>
    </Layout>
  );
};
