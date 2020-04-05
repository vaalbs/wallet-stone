import React from "react";
import { useForm } from "react-hook-form";
import { AlertWrapper } from "../../styles/Antd/Alert/styled";
import { ModalWrapper } from "../../styles/Antd/Modal/styled";
import { Loading } from "../Loading";
import { FormWrapper, Input, Label } from "./styled";

export interface IFormModal {
  errorMessage: string;
  loading: boolean;
  showOnBuy: boolean;
  showOnSell: boolean;
  onBuy: (formData: IFormFields) => void;
  onSell: (formData: IFormFields) => void;
  setShowOnBuy: (value: boolean) => void;
  setShowOnSell: (value: boolean) => void;
}

export interface IFormFields {
  amount: number;
}

export interface IProps {
  button: string;
  errorMessage: string;
  loading: boolean;
  showModal: boolean;
  title: string;
  onSubmit: (formData: IFormFields) => void;
  setShowModal: (value: boolean) => void;
}

export const Form = (props: IProps) => {
  const { register, handleSubmit, errors, clearError, setValue } = useForm<
    IFormFields
  >();

  return (
    <ModalWrapper
      okButtonProps={{ htmlType: "submit" }}
      onOk={handleSubmit(props.onSubmit)}
      visible={props.showModal}
      title={`${props.title}`}
      closable={false}
      maskClosable={true}
      cancelText="Cancelar"
      onCancel={() => {
        props.setShowModal(false);
        clearError();
        setValue([{ amount: "" }]);
      }}
      okText={`${props.button}`}
    >
      {!props.loading ? (
        <FormWrapper>
          <Label>Quantidade</Label>

          <Input
            type="number"
            min={1}
            name="amount"
            ref={register({
              required: { value: true, message: "Informe a quantidade." },
              min: { value: 1, message: "Quantidade mínima de 1." },
            })}
          />

          {errors.amount && (
            <AlertWrapper
              showIcon
              message={`${errors.amount.message}`}
              type="error"
            />
          )}
          {props.errorMessage && (
            <AlertWrapper
              showIcon
              message={`${props.errorMessage}`}
              type="error"
            />
          )}
        </FormWrapper>
      ) : (
        <Loading />
      )}
    </ModalWrapper>
  );
};
