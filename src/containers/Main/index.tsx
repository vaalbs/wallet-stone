import React from "react";
import { Layout } from "antd";
import { SiderMenu } from "../../components/Sider-Menu";

export const Main = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout>
      <SiderMenu
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      />
    </Layout>
  );
};
