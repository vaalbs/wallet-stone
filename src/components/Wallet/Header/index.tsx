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
  Value
} from "./styled";

export interface IValue {
  title: string;
  value: string;
}

interface IProps {
  options: IValue[];
}

export const Header = (props: IProps) => {
  return (
    <HeaderWrapper>
      <ListWrapper>
        {props.options.map(option => (
          <BlockWrapper>
            <Title>{option.title}</Title>
            <Value>
              <Prefix>R$</Prefix>
              {option.value}
            </Value>
          </BlockWrapper>
        ))}
      </ListWrapper>
      <ButtonWrapper>
        <Button>
          <BuyIcon /> Comprar
        </Button>
        <Button>
          <SellIcon /> Vender
        </Button>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};
