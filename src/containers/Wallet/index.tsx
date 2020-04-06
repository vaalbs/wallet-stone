import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React from "react";
import { IFormFields } from "../../components/Form";
import { Wallet } from "../../components/Wallet";
import axios from "../../utils/axios-orders";
import { dateNow } from "../../utils/formatters";

const { confirm } = Modal;

export const WalletComponent = () => {
  const ultimoMes = React.createRef<HTMLCanvasElement>();
  const mes2 = React.createRef<HTMLCanvasElement>();

  const [showOnBuy, setShowOnBuy] = React.useState(false);
  const [showOnSell, setShowOnSell] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, serErrorMessage] = React.useState("");

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
    errorMessage,
    showOnBuy,
    showOnSell,
    loading,
    onBuy: (formData: IFormFields) => onBuyBitcoin(formData),
    onSell: () => onSell,
    setShowOnBuy: () => setShowOnBuy(false),
    setShowOnSell: () => setShowOnSell(false),
    showConfirm: () => showConfirm(),
  };

  const buttons = {
    onBuy: () => {
      setShowOnBuy(true);
      serErrorMessage("");
    },
    onSell: () => {
      setShowOnSell(true);
      serErrorMessage("");
    },
  };

  const showConfirm = () => {
    confirm({
      title: "Tem certeza que deseja trocar as moedas?",
      icon: <ExclamationCircleOutlined />,
      okText: "Sim",
      okButtonProps: { loading },
      cancelText: "Não",
      onOk: () => onChangeCoins(),
      onCancel() {},
    });
  };

  const onChangeCoins = () => {};

  const onBuyBitcoin = (formData: IFormFields) => {
    setLoading(true);

    const order = {
      amount: formData.amount,
      coin: "Bitcoin",
      date: dateNow(),
      operation: "buy",
    };

    axios
      .post("/orders.json", order)
      .then(() => {
        setShowOnBuy(false);
        message.success("Compra realizada com sucesso!");
      })
      .catch(() =>
        serErrorMessage("Oops! Algo deu errado. Tente novamete mais tarde.")
      )
      .finally(() => setLoading(false));
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

  return <Wallet tabs={tabs} />;
};
