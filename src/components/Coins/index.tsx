import React from "react";
import { ChartComponent, IChart } from "../Chart";
import { Header, IValue } from "../Wallet/Header";

interface IProps {
  values: IValue[];
  charts: IChart[];
}

export const Coins = (props: IProps) => {
  return (
    <div>
      <Header options={props.values} />
      <ChartComponent charts={props.charts} />
    </div>
  );
};
