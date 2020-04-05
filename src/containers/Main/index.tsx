import { Layout } from "antd";
import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SiderMenu } from "../../components/Sider-Menu";
import { WalletComponent } from "../Wallet";

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

        <WalletComponent />

        <Footer />
      </Layout>
    </Layout>
  );
};
