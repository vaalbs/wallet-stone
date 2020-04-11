import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useForm } from "react-hook-form";
import { AlertWrapper } from "../../styles/Antd/Alert/styled";
import { CoinValue, FormWrapper, Input, Label, Paragraph } from "./styled";

export interface IFormFields {
  amount: number;
}

export interface IFormModal {
  buttonModalName: string;
  errorMessage: string;
  loading: boolean;
  showModal: boolean;
  title: string;
  buttonIcon?: any;
  buttonName?: string;
  coinValue?: number;
  onSubmit: (formData: IFormFields) => void;
  setShowModal: (value: boolean) => void;
  onClick?: () => void;
}

export const Form = (props: IFormModal) => {
  const { register, handleSubmit, errors, watch } = useForm<IFormFields>();
  const values = watch("amount");

  return (
    <Modal
      okButtonProps={{ htmlType: "submit" }}
      onOk={handleSubmit(props.onSubmit)}
      visible={props.showModal}
      title={props.title}
      closable={false}
      maskClosable={true}
      confirmLoading={props.loading}
      cancelText="Cancelar"
      onCancel={() => props.setShowModal(false)}
      okText={`${props.buttonModalName}`}
      destroyOnClose={true}
    >
      <FormWrapper>
        <Paragraph>
          Cotação: <CoinValue>R$ {props.coinValue}</CoinValue>
        </Paragraph>

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

        <Paragraph>
          Total:{" "}
          <CoinValue>
            R${" "}
            {values
              ? (values * (props.coinValue ? props.coinValue : 0)).toFixed(2)
              : "0"}
          </CoinValue>
        </Paragraph>

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
    </Modal>
  );
};
