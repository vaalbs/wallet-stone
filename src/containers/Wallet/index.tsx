import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { IFormFields } from "../../components/Form";
import { Loading } from "../../components/Loading";
import { operation } from "../../components/RecentTransactions";
import { Title } from "../../components/Title";
import { Wallet } from "../../components/Wallet";
import firebaseRef from "../../service/firebase";
import { dateNow } from "../../utils/formatters";

const { confirm } = Modal;

export const WalletComponent = () => {
  const ultimoMes = React.createRef<HTMLCanvasElement>();
  const mes2 = React.createRef<HTMLCanvasElement>();

  const [showOnBuy, setShowOnBuy] = React.useState(false);
  const [showOnSell, setShowOnSell] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, serErrorMessage] = React.useState("");

  const [sale, setSale] = React.useState();

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const sale = firebaseRef.database().ref().child("user");
      await sale.on("value", (snap) => setSale(snap.val().sale));
    } catch (error) {}
  };

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
    { title: "Saldo", value: sale },
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

  const transactions = [
    {
      dateHour: "06/04/2020 20:40",
      type: "buy" as operation,
      value: 4500.0,
    },
    {
      dateHour: "05/04/2020 17:34",
      type: "sell" as operation,
      value: 500.0,
    },
  ];

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

    try {
      firebaseRef.database().ref("user/orders").push(order);
      setShowOnBuy(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
      transactions,
      formModal,
    },
    {
      tabTitle: "Brita",
      values: dataMock,
      buttons,
      charts: charts2,
      transactions,
      formModal,
    },
  ];

  return (
    <>
      <Title title="Wallet" />
      {sale ? <Wallet tabs={tabs} /> : <Loading />}
    </>
  );
};
