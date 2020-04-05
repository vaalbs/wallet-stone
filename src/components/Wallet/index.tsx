import React from "react";
import { TabPaneWrapper, TabWrapper } from "../../styles/Tab/styled";
import { IChart } from "../Chart";
import { Coins } from "../Coins";
import { Form, IFormFields } from "../Form";
import { IButtons, IValue } from "../Wallet/Header";
import { ContentWrapper, Line } from "./styled";

interface IFormModal {
  showOnBuy: boolean;
  showOnSell: boolean;
  onBuy: (formData: IFormFields) => void;
  onSell: (formData: IFormFields) => void;
  setShowOnBuy: (value: boolean) => void;
  setShowOnSell: (value: boolean) => void;
}

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
            />
            <Form
              showModal={tab.formModal.showOnSell}
              setShowModal={() => tab.formModal.setShowOnSell(false)}
              onSubmit={tab.formModal.onSell}
              title={`Vender ${tab.tabTitle}`}
              button="Vender"
            />
          </TabPaneWrapper>
        ))}
      </TabWrapper>
      <Line />
    </ContentWrapper>
  );
};
