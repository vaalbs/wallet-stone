import React from "react";
import { Title } from "../Title";
import {
  Amount,
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
  amount: number;
  coin?: string;
  dateHour: string;
  operation: operation;
  total: number;
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
        {props.transactions.length > 0
          ? props.transactions.map((transaction, index) => (
              <RecentTransaction key={index}>
                <DateHour>{transaction.dateHour}</DateHour>
                {transaction.operation === "buy" ? (
                  <Operation>
                    <IconSell /> Comprar
                  </Operation>
                ) : (
                  <Operation>
                    <IconBuy /> Vender
                  </Operation>
                )}
                <Amount>
                  {transaction.amount > 1
                    ? `${Number(transaction.amount).toFixed(2)} itens`
                    : `${transaction.amount} item`}
                </Amount>
                <Value>R$ {transaction.total.toFixed(2)}</Value>
              </RecentTransaction>
            ))
          : "Nenhuma transação encontrada."}
      </RecentTransactionsList>
    </RecentTransactionsWrapper>
  );
};
