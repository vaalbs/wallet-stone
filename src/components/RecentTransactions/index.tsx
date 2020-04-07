import React from "react";
import { Title } from "../Title";
import {
  DateHour,
  IconBuy,
  IconSell,
  Operation,
  RecentTransaction,
  RecentTransactionsList,
  RecentTransactionsWrapper,
  Value,
} from "./styled";

export type operation = "buy" | "sell";

export interface ITransaction {
  dateHour: string;
  type: operation;
  value: number;
}

interface IProps {
  transactions: ITransaction[];
}

export const RecentTransactions = (props: IProps) => {
  return (
    <RecentTransactionsWrapper>
      <Title
        fontSize="12px"
        borderBottom={true}
        padding={false}
        title="Transações Recentes"
      />
      <RecentTransactionsList>
        {props.transactions.map((transaction, index) => (
          <RecentTransaction key={index}>
            <DateHour>{transaction.dateHour}</DateHour>
            {transaction.type === "buy" ? (
              <Operation>
                <IconSell /> Comprar
              </Operation>
            ) : (
              <Operation>
                <IconBuy /> Vender
              </Operation>
            )}
            <Value>R$ {transaction.value}</Value>
          </RecentTransaction>
        ))}
      </RecentTransactionsList>
    </RecentTransactionsWrapper>
  );
};
