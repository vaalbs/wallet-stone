import { Layout } from "antd";
import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SiderMenu } from "../../components/Sider-Menu";
import { ContentWrapper, Line, TabPaneWrapper, TabWrapper } from "./styled";

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

        <ContentWrapper>
          <TabWrapper defaultActiveKey="1">
            <TabPaneWrapper tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPaneWrapper>
            <TabPaneWrapper tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPaneWrapper>
          </TabWrapper>
          <Line />
        </ContentWrapper>

        <Footer />
      </Layout>
    </Layout>
  );
};
