import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { LoadingWrapper } from "../../styles/Antd/Spin/styled";

export const Loading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return <LoadingWrapper indicator={antIcon} />;
};
