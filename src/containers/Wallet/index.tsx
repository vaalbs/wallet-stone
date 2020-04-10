import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import axios from "axios";
import React from "react";
import { IFormFields } from "../../components/Form";
import { Loading } from "../../components/Loading";
import { operation } from "../../components/Recent-Transactions";
import { Title } from "../../components/Title";
import { Wallet } from "../../components/Wallet";
import firebaseRef from "../../service/firebase";
import { dateBitcoin, dateBrita, dateNow } from "../../utils/formatters";

const { confirm } = Modal;

interface IUser {
  sale: string;
  bitcoin: number;
  brita: number;
  orders: any;
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
    const initialDateBrita = dateBrita(0);
    const finalDateBrita = dateBrita(1);

    // brtia
    axios
      .get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${initialDateBrita}'&@dataFinalCotacao='${finalDateBrita}'&$top=100&$format=json&$select=cotacaoCompra`
      )
      .then((response) =>
        setBrita(response.data.value[0].cotacaoCompra.toFixed(2))
      );

    // bitcoin
    axios
      .get(
        `https://economia.awesomeapi.com.br/BTC-BRL/?start_date=${dateBitcoin()}&end_date=${dateBitcoin()}`
      )
      .then((response) => setBitcoin(response.data[0].bid));
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

  const equityValue = (
    Number(user?.sale ?? 0) +
    (user?.bitcoin ?? 0) * bitcoin +
    (user?.brita ?? 0) * brita
  ).toFixed(2);

  const dataBitcoin = [
    {
      title: "Valor Patrimonial",
      value: equityValue,
    },
    {
      title: "Total em Bitcoin",
      value: ((user?.bitcoin ?? 0) * bitcoin).toFixed(2),
    },
    { title: "Saldo", value: Number(user?.sale).toFixed(2) },
  ];

  const dataBrita = [
    {
      title: "Valor Patrimonial",
      value: equityValue,
    },
    { title: "Total em Brita", value: ((user?.brita ?? 0) * brita).toFixed(2) },
    { title: "Saldo", value: Number(user?.sale).toFixed(2) },
  ];

  const formModalBitcoin = {
    errorMessage,
    showOnBuy,
    showOnSell,
    loading,
    coinValue: bitcoin,
    onBuy: (formData: IFormFields) =>
      onBuy(formData, bitcoin, "Bitcoin", user?.bitcoin),
    onSell: (formData: IFormFields) =>
      onSell(formData, bitcoin, "Bitcoin", user?.bitcoin),
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
    onSell: (formData: IFormFields) =>
      onSell(formData, brita, "Brita", user?.brita),
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

    const totalBuy = formData.amount * coinValue;

    if (totalBuy > Number(user?.sale)) {
      setLoading(false);
      setErrorMessage("Saldo insuficiente!");
      return;
    }

    const totalSale = Number(user?.sale) - formData.amount * (coinValue ?? 0);

    const order = [
      {
        amount: formData.amount,
        coin: title,
        date: dateNow(),
        operation: "buy",
        total: totalBuy,
      },
    ];
    try {
      firebaseRef
        .database()
        .ref("user")
        .update({
          sale: totalSale,
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

  const onSell = (
    formData: IFormFields,
    coinValue: number,
    title: string,
    coinAmount?: number
  ) => {
    setLoading(true);

    const total = formData.amount * (coinValue ?? 0);

    if (formData.amount > (coinAmount ?? 0)) {
      setLoading(false);
      setErrorMessage("Você não possui essa quantidade!");
      return;
    }

    const totalSell = Number(user?.sale) + formData.amount * (coinValue ?? 0);

    const order = [
      {
        amount: formData.amount,
        coin: title,
        date: dateNow(),
        operation: "sell",
        total: total,
      },
    ];
    try {
      firebaseRef
        .database()
        .ref("user")
        .update({
          sale: totalSell,
          [title.toLocaleLowerCase()]:
            (coinAmount ?? 0) - Number(formData.amount),
        })
        .then(() => firebaseRef.database().ref("user/orders").push(order));

      setShowOnSell(false);
      message.success("Venda realizada com sucesso!");
    } catch (error) {
      message.error(
        error.message || "Oops! Algo deu errado. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
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
