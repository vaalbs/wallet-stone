import React from "react";
import { ChartComponent, IChart } from "../Chart";
import { IFormModal } from "../Form";
import { ITransaction, RecentTransactions } from "../Recent-Transactions";
import { Header, IValue } from "../Wallet/Header";

interface IProps {
  values: IValue[];
  formModal: IFormModal[];
  charts: IChart[];
  transactions: ITransaction[];
}

export const Coins = (props: IProps) => {
  return (
    <div>
      <Header options={props.values} formModal={props.formModal} />
      <ChartComponent charts={props.charts} />
      <RecentTransactions transactions={props.transactions} />
    </div>
  );
};
