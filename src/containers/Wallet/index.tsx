import { DollarCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { message } from "antd";
import axios from "axios";
import React from "react";
import { IFormFields } from "../../components/Form";
import { Loading } from "../../components/Loading";
import { ITransaction } from "../../components/Recent-Transactions";
import { Title } from "../../components/Title";
import { Wallet } from "../../components/Wallet";
import firebaseRef from "../../service/firebase";
import {
  dateBitcoin,
  dateBrita,
  dateNow,
  daysWithoutWekeend,
  monthLabels,
} from "../../utils/formatters";

interface IUser {
  sale: string;
  bitcoin: number;
  brita: number;
  orders: ITransaction;
}

export const WalletComponent = () => {
  const lastMonth = React.createRef<HTMLCanvasElement>();
  const antepenultimateDays = React.createRef<HTMLCanvasElement>();

  const [lastMonthDaysBrita, setLastMonthDaysBrita] = React.useState<
    number[]
  >();
  const [lastMonthDaysBitcoin, setLastMonthDaysBitcoin] = React.useState<
    number[]
  >();

  const [
    antepenultimateMonthDaysBrita,
    setAntepenultimateMonthsDaysBrita,
  ] = React.useState<number[]>();
  const [
    antepenultimateMonthDaysBitcoin,
    setAntepenultimateMonthsDaysBitcoin,
  ] = React.useState<number[]>();

  const [antepenultimateMonth, setAntepenultimateMonth] = React.useState("");

  const [lastMonthChartDataBrita, setLastMonthChartDataBrita] = React.useState<
    number[]
  >();
  const [
    antepenultimateMonthChartDataBrita,
    setAntepenultimateMonthChartDataBrita,
  ] = React.useState<number[]>();

  const [
    lastMonthChartDataBitcoin,
    setLastMonthChartDataBitcoin,
  ] = React.useState<number[]>();
  const [
    antepenultimateMonthChartDataBitcoin,
    setAntepenultimateMonthChartDataBitcoin,
  ] = React.useState<number[]>();

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

  React.useEffect(() => {
    // ultimo mes
    getDays(1, setLastMonthDaysBrita, setLastMonthDaysBitcoin);
    getCoinsByDate(0, setLastMonthChartDataBrita, setLastMonthChartDataBitcoin);
    // penultimo mes
    getDays(
      2,
      setAntepenultimateMonthsDaysBrita,
      setAntepenultimateMonthsDaysBitcoin
    );
    getCoinsByDate(
      1,
      setAntepenultimateMonthChartDataBrita,
      setAntepenultimateMonthChartDataBitcoin
    );

    getMonth();
  }, []);

  const getDays = (
    month: number,
    setDaysBrita: (value: React.SetStateAction<number[] | undefined>) => void,
    setDaysBitcoin: (value: React.SetStateAction<number[] | undefined>) => void
  ) => {
    const date = new Date();
    const months = date.getMonth() - month;
    const year = date.getFullYear();
    setDaysBrita(daysWithoutWekeend(months, year));

    const days = new Date(
      date.getFullYear(),
      date.getMonth() + 1 - month,
      0
    ).getDate();

    let day = [];
    for (let i = 1; i <= days; i++) {
      day.push(i);
    }

    setDaysBitcoin(day);
  };

  const getMonth = () => {
    const date = new Date();
    const antepenultimate = date.getMonth() - 1;

    setAntepenultimateMonth(monthLabels[antepenultimate]);
  };

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

  const getCoinsByDate = (
    month: number,
    setDataByDateBrita: (
      value: React.SetStateAction<number[] | undefined>
    ) => void,
    setDataByDateBitcoin: (
      value: React.SetStateAction<number[] | undefined | any>
    ) => void
  ) => {
    const date = new Date();
    const months = date.getMonth() - month;
    const year = date.getFullYear();
    const days = new Date(
      date.getFullYear(),
      date.getMonth() - month,
      0
    ).getDate();

    // brtia
    axios
      .get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${months}-01-${year}'&@dataFinalCotacao='${months}-${days}-${year}'&$top=100&$format=json&$select=cotacaoCompra`
      )
      .then((response) =>
        response.data.value.map((data: any) => data.cotacaoCompra)
      )
      .then((response) => setDataByDateBrita(response));

    // bitcoin
    axios
      .get(
        `https://economia.awesomeapi.com.br/json/daily/BTC-BRL/${
          days + 1
        }?start_date=${year}${months
          .toString()
          .padStart(2, "0")}01&end_date=${year}${months
          .toString()
          .padStart(2, "0")}${days}`
      )
      .then((response) => {
        const lastDay = response.data.shift();
        const data = response.data.map((data: any) => data.bid);
        data.push(lastDay.bid);
        setDataByDateBitcoin(data);
      });
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

  const chartsBitcoin = [
    {
      labels: lastMonthDaysBitcoin,
      data: lastMonthChartDataBitcoin,
      tabTitle: "Último mês",
      reference: lastMonth,
    },
    {
      labels: antepenultimateMonthDaysBitcoin,
      data: antepenultimateMonthChartDataBitcoin,
      tabTitle: antepenultimateMonth,
      reference: antepenultimateDays,
    },
  ];

  const chartBrita = [
    {
      labels: lastMonthDaysBrita,
      data: lastMonthChartDataBrita,
      tabTitle: "Último mês",
      reference: lastMonth,
    },
    {
      labels: antepenultimateMonthDaysBrita,
      data: antepenultimateMonthChartDataBrita,
      tabTitle: antepenultimateMonth,
      reference: antepenultimateDays,
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
          setShowOnSellBitcoin,
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
        onSell(formData, brita, "Brita", setShowOnSellBrita, user?.brita),
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
          [title.toLocaleLowerCase()]: (
            Number(formData.amount) + (coinAmount ?? 0)
          ).toFixed(2),
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
          [title.toLocaleLowerCase()]: (
            (coinAmount ?? 0) - Number(formData.amount)
          ).toFixed(2),
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
          [title.toLocaleLowerCase()]: (
            (coinAmount ?? 0) + Number(formData.amount)
          ).toFixed(2),
          [titleWith.toLocaleLowerCase()]: (
            (coinAmountWith ?? 0) - amount
          ).toFixed(2),
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
      charts: chartsBitcoin,
      transactions: orderBitcoin,
      formModal: formModalBitcoin,
    },
    {
      tabTitle: "Brita",
      values: dataBrita,
      charts: chartBrita,
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
