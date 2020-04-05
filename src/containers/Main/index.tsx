import { Layout } from "antd";
import React from "react";
import { Footer } from "../../components/Footer";
import { IFormFields } from "../../components/Form";
import { Header } from "../../components/Header";
import { SiderMenu } from "../../components/Sider-Menu";
import { Wallet } from "../Wallet";

export const Main = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const ultimoMes = React.createRef<HTMLCanvasElement>();
  const mes2 = React.createRef<HTMLCanvasElement>();

  const [showOnBuy, setShowOnBuy] = React.useState(false);
  const [showOnSell, setShowOnSell] = React.useState(false);

  const charts = [
    {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      data: [12, 19, 3, 5, 4, 1],
      tabTitle: "Janeiro",
      reference: ultimoMes,
    },
    {
      labels: ["Yellow", "Purple", "Red", "Orange", "Blue", "Green"],
      data: [7, 9, 1, 15, 9, 10],
      tabTitle: "Março",
      reference: mes2,
    },
  ];

  const charts2 = [
    {
      labels: ["Green", "Yellow", "Pink", "Red", "Gray", "Blue"],
      data: [12, 19, 3, 5, 4, 1],
      tabTitle: "Janeiro",
      reference: ultimoMes,
    },
    {
      labels: ["Blue", "Gray", "Red", "Pink", "Yellow", "Green"],
      data: [7, 9, 1, 15, 9, 10],
      tabTitle: "Março",
      reference: mes2,
    },
  ];

  const dataMock = [
    { title: "Valor Patrimonial", value: "25.000" },
    { title: "Variação Patrimonial", value: "7.0000" },
    { title: "Saldo", value: "2.000" },
  ];

  const formModal = {
    showOnBuy,
    showOnSell,
    onBuy: () => onBuy,
    onSell: () => onSell,
    setShowOnBuy: () => setShowOnBuy(false),
    setShowOnSell: () => setShowOnSell(false),
  };

  const buttons = {
    onBuy: () => setShowOnBuy(true),
    onSell: () => setShowOnSell(true),
  };

  const onBuy = (formData: IFormFields) => {
    console.log(formData);
  };
  const onSell = (formData: IFormFields) => {
    console.log(formData);
  };

  const tabs = [
    {
      tabTitle: "Bitcoin",
      values: dataMock,
      buttons,
      charts,
      formModal,
    },
    {
      tabTitle: "Brita",
      values: dataMock,
      buttons,
      charts: charts2,
      formModal,
    },
  ];

  console.log(tabs);

  return (
    <Layout>
      <SiderMenu
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      />
      <Layout className="site-layout">
        <Header />

        <Wallet tabs={tabs} />

        <Footer />
      </Layout>
    </Layout>
  );
};
