import React from "react";
import { Form, IFormModal } from "../Form";
import { Button, ButtonName, ButtonWrapper } from "./styled";

interface IProps {
  formModal: IFormModal[];
}

export const ButtonList = (props: IProps) => {
  return (
    <ButtonWrapper>
      {props.formModal.map((fm) => (
        <>
          <Button onClick={fm.onClick}>
            {fm.buttonIcon} <ButtonName>{fm.buttonName}</ButtonName>
          </Button>
          <Form
            buttonName={fm.buttonName}
            buttonModalName={fm.buttonModalName}
            errorMessage={fm.errorMessage}
            loading={fm.loading}
            showModal={fm.showModal}
            title={fm.title}
            buttonIcon={fm.buttonIcon}
            coinValue={fm.coinValue}
            onSubmit={fm.onSubmit}
            setShowModal={fm.setShowModal}
            onClick={fm.onClick}
          />
        </>
      ))}
    </ButtonWrapper>
  );
};
