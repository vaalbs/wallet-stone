import React from "react";
import { TabPaneWrapper, TabWrapper } from "../../styles/Antd/Tab/styled";
import { IChart } from "../Chart";
import { Coins } from "../Coins";
import { Form, IFormModal } from "../Form";
import { ITransaction } from "../RecentTransactions";
import { IButtons, IValue } from "../Wallet/Header";
import { Button, ContentWrapper, Icon, Line } from "./styled";

interface ITabs {
  tabTitle: string;
  values: IValue[];
  buttons: IButtons;
  charts: IChart[];
  transactions: ITransaction[];
  formModal: IFormModal;
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
            <Button onClick={tab.formModal.showConfirm}>
              <Icon />
              Trocar moeda
            </Button>
            <Coins
              values={tab.values}
              charts={tab.charts}
              buttons={tab.buttons}
              transactions={tab.transactions}
            />
            <Form
              showModal={tab.formModal.showOnBuy}
              setShowModal={() => tab.formModal.setShowOnBuy(false)}
              onSubmit={tab.formModal.onBuy}
              title={`Comprar ${tab.tabTitle}`}
              button="Comprar"
              loading={tab.formModal.loading}
              errorMessage={tab.formModal.errorMessage}
              coinValue={tab.formModal.coinValue}
            />
            <Form
              showModal={tab.formModal.showOnSell}
              setShowModal={() => tab.formModal.setShowOnSell(false)}
              onSubmit={tab.formModal.onSell}
              title={`Vender ${tab.tabTitle}`}
              button="Vender"
              loading={tab.formModal.loading}
              errorMessage={tab.formModal.errorMessage}
              coinValue={tab.formModal.coinValue}
            />
          </TabPaneWrapper>
        ))}
      </TabWrapper>
      <Line />
    </ContentWrapper>
  );
};
