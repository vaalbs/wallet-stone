import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useForm } from "react-hook-form";
import { AlertWrapper } from "../../styles/Antd/Alert/styled";
import { FormWrapper, Input, Label } from "../../styles/Form/styled";
import { CoinValue, Paragraph } from "./styled";

export interface IFormFields {
  amount: number;
}

export interface IFormModal {
  buttonModalName: string;
  errorMessage: string;
  loading: boolean;
  showModal: boolean;
  title: string;
  buttonIcon?: React.ReactNode;
  buttonName?: string;
  coinValue?: number;
  coinBuyWithAmount?: number;
  coinBuyWith?: number;
  onSubmit: (formData: IFormFields) => void;
  setShowModal: (value: boolean) => void;
  onClick?: () => void;
}

export const Form = (props: IFormModal) => {
  const { register, handleSubmit, errors, watch } = useForm<IFormFields>();
  const values = watch("amount");
  const totalBuy = values * (props.coinValue ? props.coinValue : 0);
  const totalBitcoin =
    (props.coinBuyWith ?? 0) * (props.coinBuyWithAmount ?? 0);
  const bitcoinAmount = Number(totalBuy) / totalBitcoin;

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
            min: { value: 0.1, message: "Quantidade mínima de 0.1." },
          })}
        />

        <Paragraph>
          <CoinValue>
            {props.coinBuyWithAmount
              ? `Quantidade: ${
                  bitcoinAmount > 0 ? bitcoinAmount.toFixed(4) : 0
                }`
              : `Total: R$
            ${values ? totalBuy.toFixed(2) : "0"}`}
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
