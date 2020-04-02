import React from "react";
import { Coins } from "../Coins";
import { ContentWrapper, Line, TabPaneWrapper, TabWrapper } from "./styled";

export const Wallet = () => {
  const dataMock = [
    { title: "Valor Patrimonial", value: "25.000" },
    { title: "Variação Patrimonial", value: "7.0000" },
    { title: "Saldo", value: "2.000" }
  ];

  return (
    <ContentWrapper>
      <TabWrapper defaultActiveKey="1">
        <TabPaneWrapper tab="Tab 1" key="1">
          <Coins values={dataMock} />
        </TabPaneWrapper>
        <TabPaneWrapper tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPaneWrapper>
      </TabWrapper>
      <Line />
    </ContentWrapper>
  );
};
