import { Layout } from "antd";
import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SiderMenu } from "../../components/Sider-Menu";

const { Content } = Layout;

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
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
