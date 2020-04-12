import { DollarCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import axios from "axios";
import React from "react";
import { IFormFields } from "../../components/Form";
import { Loading } from "../../components/Loading";
import { ITransaction } from "../../components/Recent-Transactions";
import { Title } from "../../components/Title";
import { Wallet } from "../../components/Wallet";
import firebaseRef from "../../service/firebase";
import { dateBitcoin, dateBrita, dateNow } from "../../utils/formatters";

const { confirm } = Modal;

interface IUser {
  sale: string;
  bitcoin: number;
  brita: number;
  orders: ITransaction;
}

export const WalletComponent = () => {
  const ultimoMes = React.createRef<HTMLCanvasElement>();
  const mes2 = React.createRef<HTMLCanvasElement>();

  const [showOnBuyBitcoin, setShowOnBuyBitcoin] = React.useState(false);
  const [showOnBuyBrita, setShowOnBuyBrita] = React.useState(false);

  const [showOnBuyWithBitcoin, setShowOnBuyWithBitcoin] = React.useState(false);
  const [showOnBuyWithBrita, setShowOnBuyWithBrita] = React.useState(false);

  const [showOnSellBitcoin, setShowOnSellBitcoin] = React.useState(false);
  const [showOnSellBrita, setShowOnSellBrita] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [user, setUser] = React.useState<IUser>();
  const [orderBitcoin, setOrderBitcoin] = React.useState<ITransaction[]>([]);
  const [orderBrita, setOrderBrita] = React.useState<ITransaction[]>([]);
  const [brita, setBrita] = React.useState(0);
  const [bitcoin, setBitcoin] = React.useState(0);

  React.useEffect(() => {
    getData();
    getCoins();
  }, [user?.sale]);

  React.useEffect(() => {
    getOrdersBitcoin();
    getOrdersBrita();
  }, [user?.orders]);

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

  const getOrdersBitcoin = () => {
    if (user?.orders) {
      let order: ITransaction[] = [];
      Object.values(user.orders).reduce(function (result: any, key: any) {
        order.push(key[0]);
      }, {});

      const orderBitcoin = order
        .filter((order) => order.coin === "Bitcoin")
        .map((order) => order);

      setOrderBitcoin(orderBitcoin);
    }
  };

  const getOrdersBrita = () => {
    if (user?.orders) {
      let order: ITransaction[] = [];
      Object.values(user.orders).reduce(function (result: any, key: any) {
        order.push(key[0]);
      }, {});

      const orderBrita = order
        .filter((order) => order.coin === "Brita")
        .map((order) => order);

      setOrderBrita(orderBrita);
    }
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

  const formModalBitcoin = [
    {
      buttonName: "Comprar",
      buttonModalName: "Comprar",
      errorMessage,
      loading,
      showModal: showOnBuyBitcoin,
      title: "Comprar Bitcoin",
      buttonIcon: <ShoppingCartOutlined />,
      coinValue: bitcoin,
      onSubmit: (formData: IFormFields) =>
        onBuy(formData, bitcoin, "Bitcoin", setShowOnBuyBitcoin, user?.bitcoin),
      setShowModal: () => setShowOnBuyBitcoin(false),
      onClick: () => {
        setShowOnBuyBitcoin(true);
        setErrorMessage("");
      },
    },
    {
      buttonName: "Vender",
      buttonModalName: "Vender",
      errorMessage,
      loading,
      showModal: showOnSellBitcoin,
      title: "Vender Bitcoin",
      buttonIcon: <DollarCircleOutlined />,
      coinValue: bitcoin,
      onSubmit: (formData: IFormFields) =>
        onSell(
          formData,
          bitcoin,
          "Bitcoin",
          setShowOnBuyBitcoin,
          user?.bitcoin
        ),
      setShowModal: () => setShowOnSellBitcoin(false),
      onClick: () => {
        setShowOnSellBitcoin(true);
        setErrorMessage("");
      },
    },
    {
      buttonName: "Comprar com Brita",
      buttonModalName: "Comprar",
      errorMessage,
      loading,
      showModal: showOnBuyWithBrita,
      title: "Comprar Bitcoin usando Brita",
      buttonIcon: <ShoppingCartOutlined />,
      coinValue: bitcoin,
      onSubmit: (formData: IFormFields) =>
        onBuyWith(
          formData,
          bitcoin,
          brita,
          "Bitcoin",
          "Brita",
          setShowOnBuyWithBrita,
          user?.bitcoin,
          user?.brita
        ),
      setShowModal: () => setShowOnBuyWithBrita(false),
      onClick: () => {
        setShowOnBuyWithBrita(true);
        setErrorMessage("");
      },
    },
  ];

  const formModalBrita = [
    {
      buttonName: "Comprar",
      buttonModalName: "Comprar",
      errorMessage,
      loading,
      showModal: showOnBuyBrita,
      title: "Comprar Brita",
      buttonIcon: <ShoppingCartOutlined />,
      coinValue: brita,
      onSubmit: (formData: IFormFields) =>
        onBuy(formData, brita, "Brita", setShowOnBuyBrita, user?.brita),
      setShowModal: () => setShowOnBuyBrita(false),
      onClick: () => {
        setShowOnBuyBrita(true);
        setErrorMessage("");
      },
    },
    {
      buttonName: "Vender",
      buttonModalName: "Vender",
      errorMessage,
      loading,
      showModal: showOnSellBrita,
      title: "Vender Brita",
      buttonIcon: <DollarCircleOutlined />,
      coinValue: brita,
      onSubmit: (formData: IFormFields) =>
        onSell(formData, brita, "Brita", setShowOnBuyBrita, user?.brita),
      setShowModal: () => setShowOnSellBrita(false),
      onClick: () => {
        setShowOnSellBrita(true);
        setErrorMessage("");
      },
    },
    {
      buttonName: "Comprar com Bitcoin",
      buttonModalName: "Comprar",
      errorMessage,
      loading,
      showModal: showOnBuyWithBitcoin,
      title: "Comprar Brita usando Bitcoin",
      buttonIcon: <ShoppingCartOutlined />,
      coinValue: brita,
      onSubmit: (formData: IFormFields) =>
        onBuyWith(
          formData,
          brita,
          bitcoin,
          "Brita",
          "Bitcoin",
          setShowOnBuyWithBitcoin,
          user?.brita,
          user?.bitcoin
        ),
      setShowModal: () => setShowOnBuyWithBitcoin(false),
      onClick: () => {
        setShowOnBuyWithBitcoin(true);
        setErrorMessage("");
      },
    },
  ];

  const onBuy = (
    formData: IFormFields,
    coinValue: number,
    title: string,
    setShowModal: (value: boolean) => void,
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
        dateHour: dateNow(),
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

      message.success("Compra realizada com sucesso!");
    } catch (error) {
      message.error(
        error.message || "Oops! Algo deu errado. Tente novamente mais tarde."
      );
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  const onSell = (
    formData: IFormFields,
    coinValue: number,
    title: string,
    setShowModal: (value: boolean) => void,
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
        dateHour: dateNow(),
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

      message.success("Venda realizada com sucesso!");
    } catch (error) {
      message.error(
        error.message || "Oops! Algo deu errado. Tente novamente mais tarde."
      );
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  const onBuyWith = (
    formData: IFormFields,
    coinValue: number,
    coinBuyWith: number,
    title: string,
    titleWith: string,
    setShowModal: (value: boolean) => void,
    coinAmount?: number,
    coinAmountWith?: number
  ) => {
    setLoading(true);

    const totalBuy = formData.amount * coinValue;
    const totalCoin = coinBuyWith * (coinAmount ?? 0);

    if (totalBuy > totalCoin) {
      setLoading(false);
      setErrorMessage("Saldo insuficiente!");
      return;
    }

    const amount = totalBuy / totalCoin;

    if (amount < 0.1) {
      setLoading(false);
      setErrorMessage("Quantidade insuficiente! Quantidade mínima de 0.1.");
      return;
    }

    console.log(amount);

    const order = [
      {
        amount: formData.amount,
        coin: title,
        dateHour: dateNow(),
        operation: "buy",
        total: amount * coinValue,
      },
    ];

    const orderWith = [
      {
        amount: Number(amount).toFixed(2),
        coin: titleWith,
        dateHour: dateNow(),
        operation: "sell",
        total: amount * coinBuyWith,
      },
    ];

    try {
      firebaseRef
        .database()
        .ref("user")
        .update({
          sale: totalBuy,
          [title.toLocaleLowerCase()]:
            (coinAmount ?? 0) + Number(formData.amount),
          [titleWith.toLocaleLowerCase()]: (coinAmountWith ?? 0) - amount,
        })
        .then(() => firebaseRef.database().ref("user/orders").push(order))
        .then(() => firebaseRef.database().ref("user/orders").push(orderWith));

      message.success("Compra realizada com sucesso!");
    } catch (error) {
      message.error(
        error.message || "Oops! Algo deu errado. Tente novamente mais tarde."
      );
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  const tabs = [
    {
      tabTitle: "Bitcoin",
      values: dataBitcoin,
      charts,
      transactions: orderBitcoin,
      formModal: formModalBitcoin,
    },
    {
      tabTitle: "Brita",
      values: dataBrita,
      charts: charts2,
      transactions: orderBrita,
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
