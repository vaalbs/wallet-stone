import React from "react";
import { IChart } from "../../components/Chart";
import { Coins } from "../../components/Coins";
import { Form, IFormFields } from "../../components/Form";
import { IButtons, IValue } from "../../components/Wallet/Header";
import { TabPaneWrapper, TabWrapper } from "../../styles/Tab/styled";
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
