import React from "react";
import { ChartComponent, IChart } from "../Chart";
import { Header, IButtons, IValue } from "../Wallet/Header";

interface IProps {
  values: IValue[];
  buttons: IButtons;
  charts: IChart[];
}

export const Coins = (props: IProps) => {
  return (
    <div>
      <Header options={props.values} buttons={props.buttons} />
      <ChartComponent charts={props.charts} />
    </div>
  );
};
