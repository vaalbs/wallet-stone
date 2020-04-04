import React from "react";
import { Coins } from "../../components/Coins";
import { TabPaneWrapper, TabWrapper } from "../../Styles/Tab/styled";
import { ContentWrapper, Line } from "./styled";

export const Wallet = () => {
  const mes1 = React.createRef<HTMLCanvasElement>();
  const mes2 = React.createRef<HTMLCanvasElement>();

  const charts = [
    {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      data: [12, 19, 3, 5, 4, 1],
      tabTitle: "Janeiro",
      reference: mes1
    },
    {
      labels: ["Yellow", "Purple", "Red", "Orange", "Blue", "Green"],
      data: [7, 9, 1, 15, 9, 10],
      tabTitle: "Março",
      reference: mes2
    }
  ];

  const dataMock = [
    { title: "Valor Patrimonial", value: "25.000" },
    { title: "Variação Patrimonial", value: "7.0000" },
    { title: "Saldo", value: "2.000" }
  ];

  return (
    <ContentWrapper>
      <TabWrapper defaultActiveKey="1">
        <TabPaneWrapper tab="Tab 1" key="1">
          <Coins values={dataMock} charts={charts} />
        </TabPaneWrapper>
        <TabPaneWrapper tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPaneWrapper>
      </TabWrapper>
      <Line />
    </ContentWrapper>
  );
};
