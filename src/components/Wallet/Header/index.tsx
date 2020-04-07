import React from "react";
import {
  BlockWrapper,
  Button,
  ButtonWrapper,
  BuyIcon,
  HeaderWrapper,
  ListWrapper,
  Prefix,
  SellIcon,
  Title,
  Value,
} from "./styled";

export interface IValue {
  title: string;
  value?: string;
}

export interface IButtons {
  onBuy: () => void;
  onSell: () => void;
}

interface IProps {
  options: IValue[];
  buttons: IButtons;
}

export const Header = (props: IProps) => {
  return (
    <HeaderWrapper>
      <ListWrapper>
        {props.options.map((option, index) => (
          <BlockWrapper key={index}>
            <Title>{option.title}</Title>
            <Value>
              <Prefix>R$</Prefix>
              {option.value}
            </Value>
          </BlockWrapper>
        ))}
      </ListWrapper>
      <ButtonWrapper>
        <Button onClick={props.buttons.onBuy}>
          <BuyIcon /> Comprar
        </Button>
        <Button onClick={props.buttons.onSell}>
          <SellIcon /> Vender
        </Button>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};
