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
  getDays,
  getMonth,
} from "../../utils/date-formatters";
import { defaultErrorMessage } from "../../utils/patterns";

interface IUser {
  sale: string;
  bitcoin: number;
  brita: number;
  orders: ITransaction;
}

interface ILoading {
  data: boolean;
  chart: boolean;
  orders: boolean;
  form: boolean;
}

export const WalletComponent = () => {
  var userId = firebaseRef.auth().currentUser?.uid;

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
    setAntepenultimateMonthDaysBrita,
  ] = React.useState<number[]>();
  const [
    antepenultimateMonthDaysBitcoin,
    setAntepenultimateMonthDaysBitcoin,
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

  const [loading, setLoading] = React.useState<ILoading>({
    data: false,
    chart: false,
    orders: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const [user, setUser] = React.useState<IUser>();
  const [orderBitcoin, setOrderBitcoin] = React.useState<ITransaction[]>([]);
  const [orderBrita, setOrderBrita] = React.useState<ITransaction[]>([]);
  const [brita, setBrita] = React.useState(4.5);
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

    getMonth(setAntepenultimateMonth);
  }, []);

  React.useEffect(() => {
    // penultimo mes
    getDays(
      2,
      setAntepenultimateMonthDaysBrita,
      setAntepenultimateMonthDaysBitcoin
    );
    getCoinsByDate(
      1,
      setAntepenultimateMonthChartDataBrita,
      setAntepenultimateMonthChartDataBitcoin
    );
  }, []);

  const getData = () => {
    setLoading({ data: true, chart: false, orders: false, form: false });

    try {
      const sale = firebaseRef
        .database()
        .ref()
        .child("users/" + userId);

      sale.on("value", (snap) => setUser(snap.val()));
    } catch (error) {
      error.message(error.message || defaultErrorMessage);
    } finally {
      setLoading({ data: false, chart: false, orders: false, form: false });
    }
  };

  const getCoins = () => {
    const initialDateBrita = dateBrita(0);
    const finalDateBrita = dateBrita(2);

    // brtia
    axios
      .get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${initialDateBrita}'&@dataFinalCotacao='${finalDateBrita}'&$top=100&$format=json&$select=cotacaoCompra`
      )
      .then((response) =>
        setBrita(response.data.value[0].cotacaoCompra.toFixed(2))
      )
      .catch((error) => {
        message.error(error.message || defaultErrorMessage);
        setBrita(4.5);
      });

    // bitcoin
    axios
      .get(
        `https://economia.awesomeapi.com.br/BTC-BRL/?start_date=${dateBitcoin()}&end_date=${dateBitcoin()}`
      )
      .then((response) => setBitcoin(response.data[0].bid))
      .catch((error) => {
        message.error(error.message || defaultErrorMessage);
        setBitcoin(37000);
      });
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
    setLoading({ data: false, chart: true, orders: false, form: false });

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
      .then((response) => setDataByDateBrita(response))
      .catch((error) => message.error(error.message || defaultErrorMessage))
      .finally(() =>
        setLoading({ data: false, chart: false, orders: false, form: false })
      );

    // bitcoin
    axios
      .get(
        `https://economia.awesomeapi.com.br/json/daily/BTC-BRL/${days}?start_date=${year}${months
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
      })
      .catch((error) => message.error(error.message || defaultErrorMessage))
      .finally(() =>
        setLoading({ data: false, chart: false, orders: false, form: false })
      );
  };

  const getOrdersBitcoin = () => {
    setLoading({ data: false, chart: false, orders: true, form: false });

    try {
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
    } catch (error) {
      message.error(error.message || defaultErrorMessage);
    } finally {
      setLoading({ data: false, chart: false, orders: false, form: false });
    }
  };

  const getOrdersBrita = () => {
    setLoading({ data: false, chart: false, orders: true, form: false });

    try {
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
    } catch (error) {
      message.error(error.message || defaultErrorMessage);
    } finally {
      setLoading({ data: false, chart: false, orders: false, form: false });
    }
  };

  const chartBitcoin = [
    {
      labels: lastMonthDaysBitcoin,
      data: lastMonthChartDataBitcoin,
      tabTitle: "Último mês",
      reference: lastMonth,
      loading: loading.chart,
    },
    {
      labels: antepenultimateMonthDaysBitcoin,
      data: antepenultimateMonthChartDataBitcoin,
      tabTitle: antepenultimateMonth,
      reference: antepenultimateDays,
      loading: loading.chart,
    },
  ];

  const chartBrita = [
    {
      labels: lastMonthDaysBrita,
      data: lastMonthChartDataBrita,
      tabTitle: "Último mês",
      reference: lastMonth,
      loading: loading.chart,
    },
    {
      labels: antepenultimateMonthDaysBrita,
      data: antepenultimateMonthChartDataBrita,
      tabTitle: antepenultimateMonth,
      reference: antepenultimateDays,
      loading: loading.chart,
    },
  ];

  const equityValue = (
    Number(user?.sale ?? 0) +
    Number((user?.bitcoin ?? 0) * bitcoin) +
    Number((user?.brita ?? 0) * brita)
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
    { title: "Quantidade", amount: Number(user?.bitcoin ?? 0).toFixed(2) },
  ];

  const dataBrita = [
    {
      title: "Valor Patrimonial",
      value: equityValue,
    },
    { title: "Total em Brita", value: ((user?.brita ?? 0) * brita).toFixed(2) },
    { title: "Saldo", value: Number(user?.sale).toFixed(2) },
    { title: "Quantidade", amount: Number(user?.brita ?? 0).toFixed(2) },
  ];

  const formModalBitcoin = [
    {
      buttonName: "Comprar",
      buttonModalName: "Comprar",
      errorMessage,
      loading: loading?.form,
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
      loading: loading?.form,
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
      loading: loading?.form,
      showModal: showOnBuyWithBrita,
      title: "Comprar Bitcoin usando Brita",
      buttonIcon: <ShoppingCartOutlined />,
      coinValue: bitcoin,
      coinBuyWithAmount: user?.brita,
      coinBuyWith: brita,
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
      loading: loading?.form,
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
      loading: loading?.form,
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
      loading: loading?.form,
      showModal: showOnBuyWithBitcoin,
      title: "Comprar Brita usando Bitcoin",
      buttonIcon: <ShoppingCartOutlined />,
      coinValue: brita,
      coinBuyWithAmount: user?.bitcoin,
      coinBuyWith: bitcoin,
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
    setLoading({ data: false, chart: false, orders: false, form: true });

    const totalBuy = formData.amount * coinValue;

    if (totalBuy > Number(user?.sale)) {
      setLoading({ data: false, chart: false, orders: false, form: false });
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

    firebaseRef
      .database()
      .ref("users/" + userId)
      .update({
        sale: totalSale,
        [title.toLocaleLowerCase()]: Number(
          Number(formData.amount) + Number(coinAmount ?? 0)
        ),
      })
      .then(() => {
        firebaseRef
          .database()
          .ref("users/" + userId + "/orders")
          .push(order);
        message.success("Compra realizada com sucesso!");
      })
      .catch((error) => message.error(error.message || defaultErrorMessage))
      .finally(() => {
        setShowModal(false);
        setLoading({ data: false, chart: false, orders: false, form: false });
      });
  };

  const onSell = (
    formData: IFormFields,
    coinValue: number,
    title: string,
    setShowModal: (value: boolean) => void,
    coinAmount?: number
  ) => {
    setLoading({ data: false, chart: false, orders: false, form: true });

    const total = formData.amount * (coinValue ?? 0);

    if (formData.amount > Number(coinAmount ?? 0)) {
      setLoading({ data: false, chart: false, orders: false, form: false });
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

    firebaseRef
      .database()
      .ref("users/" + userId)
      .update({
        sale: totalSell,
        [title.toLocaleLowerCase()]: Number(
          Number(coinAmount ?? 0) - Number(formData.amount)
        ),
      })
      .then(() => {
        firebaseRef
          .database()
          .ref("users/" + userId + "/orders")
          .push(order);
        message.success("Venda realizada com sucesso!");
      })
      .catch((error) => message.error(error.message || defaultErrorMessage))
      .finally(() => {
        setShowModal(false);
        setLoading({ data: false, chart: false, orders: false, form: false });
      });
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
    setLoading({ data: false, chart: false, orders: false, form: true });

    const totalBuy = formData.amount * coinValue;
    const totalCoin = coinBuyWith * (coinAmountWith ?? 0);

    if (totalBuy > totalCoin) {
      setLoading({ data: false, chart: false, orders: false, form: false });
      setErrorMessage("Saldo insuficiente!");
      return;
    }

    const amount = totalBuy / totalCoin;
    const amountBuy = totalBuy / coinBuyWith;

    if (amount < 0.1) {
      setLoading({ data: false, chart: false, orders: false, form: false });
      setErrorMessage("Quantidade insuficiente! Quantidade mínima de 0.1.");
      return;
    }

    if (
      coinAmountWith &&
      (coinAmountWith === 0 || coinAmountWith < Number(amount.toFixed(2)))
    ) {
      setLoading({ data: false, chart: false, orders: false, form: false });
      setErrorMessage("Quantidade insuficiente!");
      return;
    }

    const order = [
      {
        amount: formData.amount,
        coin: title,
        dateHour: dateNow(),
        operation: "buy",
        total: amountBuy * coinBuyWith,
      },
    ];

    const orderWith = [
      {
        amount: Number(amountBuy).toFixed(2),
        coin: titleWith,
        dateHour: dateNow(),
        operation: "sell",
        total: amountBuy * coinBuyWith,
      },
    ];

    firebaseRef
      .database()
      .ref("users/" + userId)
      .update({
        sale: totalBuy,
        [title.toLocaleLowerCase()]: Number(
          Number(coinAmount ?? 0) + Number(formData.amount)
        ),
        [titleWith.toLocaleLowerCase()]: Number(
          ((coinAmountWith ?? 0) - amountBuy).toFixed(2)
        ),
      })
      .then(() =>
        firebaseRef
          .database()
          .ref("users/" + userId + "/orders")
          .push(order)
      )
      .then(() => {
        firebaseRef
          .database()
          .ref("users/" + userId + "/orders")
          .push(orderWith);
        message.success("Compra realizada com sucesso!");
      })
      .catch((error) => message.error(error.message || defaultErrorMessage))
      .finally(() => {
        setShowModal(false);
        setLoading({ data: false, chart: false, orders: false, form: false });
      });
  };

  const tabs = [
    {
      tabTitle: "Bitcoin",
      values: dataBitcoin,
      charts: chartBitcoin,
      transactions: orderBitcoin,
      loadingOrders: loading.orders,
      formModal: formModalBitcoin,
    },
    {
      tabTitle: "Brita",
      values: dataBrita,
      charts: chartBrita,
      transactions: orderBrita,
      loadingOrders: loading.orders,
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
