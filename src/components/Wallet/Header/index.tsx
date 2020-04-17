import React from "react";
import { ButtonList } from "../../Button-List";
import { IFormModal } from "../../Form";
import {
  BlockWrapper,
  HeaderWrapper,
  ListWrapper,
  Prefix,
  Title,
  Value,
} from "./styled";

export interface IValue {
  title: string;
  value?: string;
  amount?: number | string;
}

interface IProps {
  options: IValue[];
  formModal: IFormModal[];
}

export const Header = (props: IProps) => {
  return (
    <HeaderWrapper>
      <ListWrapper>
        {props.options.map((option, index) => (
          <BlockWrapper key={index}>
            <Title>{option.title}</Title>
            {option.value && (
              <Value>
                <Prefix>R$</Prefix>
                {option.value}
              </Value>
            )}
            <Value>{option.amount}</Value>
          </BlockWrapper>
        ))}
      </ListWrapper>
      <ButtonList formModal={props.formModal} />
    </HeaderWrapper>
  );
};
