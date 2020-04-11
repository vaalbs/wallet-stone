import React from "react";
import { TabPaneWrapper, TabWrapper } from "../../styles/Antd/Tab/styled";
import { IChart } from "../Chart";
import { Coins } from "../Coins";
import { IFormModal } from "../Form";
import { ITransaction } from "../Recent-Transactions";
import { IValue } from "../Wallet/Header";
import { ContentWrapper, Line } from "./styled";

interface ITabs {
  tabTitle: string;
  values: IValue[];
  formModal: IFormModal[];
  charts: IChart[];
  transactions: ITransaction[];
}

interface IProps {
  tabs: ITabs[];
}

export const Wallet = (props: IProps) => {
  return (
    <ContentWrapper>
      <TabWrapper defaultActiveKey="0">
        {props.tabs.map((tab, index) => (
          <TabPaneWrapper tab={`${tab.tabTitle}`} key={`${index}`}>
            <Coins
              values={tab.values}
              charts={tab.charts}
              formModal={tab.formModal}
              transactions={tab.transactions}
            />
          </TabPaneWrapper>
        ))}
      </TabWrapper>
      <Line />
    </ContentWrapper>
  );
};
