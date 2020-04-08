import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import axios from "axios";
import React from "react";
import { IFormFields } from "../../components/Form";
import { Loading } from "../../components/Loading";
import { operation } from "../../components/RecentTransactions";
import { Title } from "../../components/Title";
import { Wallet } from "../../components/Wallet";
import firebaseRef from "../../service/firebase";
import { dateNow, dateNowEUA } from "../../utils/formatters";

const { confirm } = Modal;

interface IUser {
  sale: string;
  bitcoin: number;
  brita: number;
}

export const WalletComponent = () => {
  const ultimoMes = React.createRef<HTMLCanvasElement>();
  const mes2 = React.createRef<HTMLCanvasElement>();

  const [showOnBuy, setShowOnBuy] = React.useState(false);
  const [showOnSell, setShowOnSell] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [user, setUser] = React.useState<IUser>();
  const [brita, setBrita] = React.useState(0);
  const [bitcoin, setBitcoin] = React.useState(0);

  React.useEffect(() => {
    getData();
    getCoins();
  }, [user?.sale]);

  const getData = () => {
    try {
      const sale = firebaseRef.database().ref().child("user");
      sale.on("value", (snap) => setUser(snap.val()));
    } catch (error) {}
  };

  const getCoins = () => {
    const initialDate = dateNowEUA(0);
    const finalDate = dateNowEUA(1);

    axios
      .get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${initialDate}'&@dataFinalCotacao='${finalDate}'&$top=100&$format=json&$select=cotacaoCompra`
      )
      .then((response: any) =>
        setBrita(response.data.value[0].cotacaoCompra.toFixed(2))
      );
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

  const dataBitcoin = [
    { title: "Valor Patrimonial", value: "25.0" },
    { title: "Variação Patrimonial", value: "7.0" },
    { title: "Saldo", value: user?.sale },
  ];

  const dataBrita = [
    {
      title: "Valor Patrimonial",
      value: (Number(user?.sale ?? 0) + (user?.brita ?? 0) * brita).toFixed(2),
    },
    { title: "Total em Brita", value: ((user?.brita ?? 0) * brita).toFixed(2) },
    { title: "Saldo", value: user?.sale },
  ];

  console.log(user);

  const formModalBitcoin = {
    errorMessage,
    showOnBuy,
    showOnSell,
    loading,
    coinValue: bitcoin,
    onBuy: (formData: IFormFields) =>
      onBuy(formData, bitcoin, "Bitcoin", user?.bitcoin),
    onSell: () => onSell,
    setShowOnBuy: () => setShowOnBuy(false),
    setShowOnSell: () => setShowOnSell(false),
    showConfirm: () => showConfirm(),
  };

  const formModalBrita = {
    errorMessage,
    showOnBuy,
    showOnSell,
    loading,
    coinValue: brita,
    onBuy: (formData: IFormFields) =>
      onBuy(formData, brita, "Brita", user?.brita),
    onSell: () => onSell,
    setShowOnBuy: () => setShowOnBuy(false),
    setShowOnSell: () => setShowOnSell(false),
    showConfirm: () => showConfirm(),
  };

  const buttons = {
    onBuy: () => {
      setShowOnBuy(true);
      setErrorMessage("");
    },
    onSell: () => {
      setShowOnSell(true);
      setErrorMessage("");
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

  const onBuy = (
    formData: IFormFields,
    coinValue: number,
    title: string,
    coinAmount?: number
  ) => {
    setLoading(true);

    const sale = formData.amount * coinValue;

    if (sale > Number(user?.sale)) {
      setLoading(false);
      setErrorMessage("Saldo insuficiente!");
      return;
    }

    const total = Number(user?.sale) - formData.amount * (coinValue ?? 0);

    const order = {
      amount: formData.amount,
      coin: title,
      date: dateNow(),
      operation: "buy",
    };

    try {
      firebaseRef
        .database()
        .ref("user")
        .update({
          sale: total,
          [title.toLocaleLowerCase()]:
            Number(formData.amount) + (coinAmount ?? 0),
        })
        .then(() => firebaseRef.database().ref("user/orders").push(order));

      setShowOnBuy(false);
      message.success("Compra realizada com sucesso!");
    } catch (error) {
      message.error(
        error.message || "Oops! Algo deu errado. Tente novamente mais tarde."
      );
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
      values: dataBitcoin,
      buttons,
      charts,
      transactions,
      formModal: formModalBitcoin,
    },
    {
      tabTitle: "Brita",
      values: dataBrita,
      buttons,
      charts: charts2,
      transactions,
      formModal: formModalBrita,
    },
  ];

  return (
    <>
      <Title title="Wallet" />
      {user ? <Wallet tabs={tabs} /> : <Loading />}
    </>
  );
};
