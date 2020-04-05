import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useForm } from "react-hook-form";
import { FormWrapper, Input, Label } from "./styled";

export interface IFormFields {
  amount: number;
}

export interface IProps {
  button: string;
  showModal: boolean;
  title: string;
  onSubmit: (formData: IFormFields) => void;
  setShowModal: (value: boolean) => void;
}

export const Form = (props: IProps) => {
  const { register, handleSubmit, errors } = useForm<IFormFields>();

  return (
    <Modal
      okButtonProps={{ htmlType: "submit" }}
      onOk={handleSubmit(props.onSubmit)}
      visible={props.showModal}
      title={`${props.title}`}
      closable={false}
      maskClosable={true}
      cancelText="Cancelar"
      onCancel={() => props.setShowModal(false)}
      okText={`${props.button}`}
    >
      <FormWrapper>
        <Label>
          Quantidade
          <Input
            type="number"
            min={1}
            name="amount"
            ref={register({ required: true })}
          />
          {errors.amount && "Informe a quantidade."}
        </Label>
      </FormWrapper>
    </Modal>
  );
};
