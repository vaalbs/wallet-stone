import React from "react";
import { Header, IValue } from "../../components/Wallet/Header/";

interface IProps {
  values: IValue[];
}

export const Coins = (props: IProps) => {
  return <Header options={props.values} />;
};
