import React from "react";
import { TabPaneWrapper, TabWrapper } from "../../styles/Tab/styled";
import { IChart } from "../Chart";
import { Coins } from "../Coins";
import { Form, IFormModal } from "../Form";
import { IButtons, IValue } from "../Wallet/Header";
import { ContentWrapper, Line } from "./styled";

interface ITabs {
  tabTitle: string;
  values: IValue[];
  buttons: IButtons;
  charts: IChart[];
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
            <Coins
              values={tab.values}
              charts={tab.charts}
              buttons={tab.buttons}
            />
            <Form
              showModal={tab.formModal.showOnBuy}
              setShowModal={() => tab.formModal.setShowOnBuy(false)}
              onSubmit={tab.formModal.onBuy}
              title={`Comprar ${tab.tabTitle}`}
              button="Comprar"
              loading={tab.formModal.loading}
              errorMessage={tab.formModal.errorMessage}
            />
            <Form
              showModal={tab.formModal.showOnSell}
              setShowModal={() => tab.formModal.setShowOnSell(false)}
              onSubmit={tab.formModal.onSell}
              title={`Vender ${tab.tabTitle}`}
              button="Vender"
              loading={tab.formModal.loading}
              errorMessage={tab.formModal.errorMessage}
            />
          </TabPaneWrapper>
        ))}
      </TabWrapper>
      <Line />
    </ContentWrapper>
  );
};
