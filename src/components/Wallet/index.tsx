import React from "react";
import { TabPaneWrapper, TabWrapper } from "../../styles/Antd/Tab/styled";
import { ChartComponent, IChart } from "../Chart";
import { IFormModal } from "../Form";
import { ITransaction, RecentTransactions } from "../Recent-Transactions";
import { Header, IValue } from "../Wallet/Header";
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
            <Header options={tab.values} formModal={tab.formModal} />
            <ChartComponent charts={tab.charts} />
            <RecentTransactions transactions={tab.transactions} />
          </TabPaneWrapper>
        ))}
      </TabWrapper>
      <Line />
    </ContentWrapper>
  );
};
