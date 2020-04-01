import { Breadcrumb, Layout } from "antd";
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
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
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
