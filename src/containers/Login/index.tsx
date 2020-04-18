import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import firebaseRef from "../../service/firebase";
import { AlertWrapper } from "../../styles/Antd/Alert/styled";
import {
  ButtonWrapper,
  Form,
  FormWrapper,
  InputWrapper,
  LinkWrapper,
  Text,
  Title,
} from "../../styles/Auth/styled";
import { Label, Row } from "../../styles/Form/styled";
import { PATTERNS, VALIDATION_MESSAGE } from "../../utils/patterns";

interface IFormFields {
  login: string;
  password: string;
}

interface IProps {
  onLogged: () => void;
}

export const Login = (props: IProps) => {
  const { register, handleSubmit, errors } = useForm<IFormFields>();
  const history = useHistory();

  const onSubmit = (values: IFormFields) => {
    firebaseRef
      .auth()
      .signInWithEmailAndPassword(values.login, values.password)
      .then((res) => {
        setImmediate(() => history.push("/carteira"));
        props.onLogged();
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  return (
    <FormWrapper>
      <Title>Acesse sua conta para ver sua carteira</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Label>Login</Label>
          <InputWrapper
            name="login"
            type="email"
            ref={register({
              required: { value: true, message: VALIDATION_MESSAGE.required },
              pattern: {
                value: PATTERNS.email,
                message: VALIDATION_MESSAGE.pattern.email,
              },
            })}
          />
          {errors.login && (
            <AlertWrapper
              showIcon
              message={`${errors.login.message}`}
              type="error"
            />
          )}
        </Row>
        <Row>
          <Label>Senha</Label>
          <InputWrapper
            name="password"
            type="password"
            ref={register({
              required: { value: true, message: VALIDATION_MESSAGE.required },
              minLength: { value: 8, message: VALIDATION_MESSAGE.minLength },
              pattern: {
                value: PATTERNS.password,
                message: VALIDATION_MESSAGE.pattern.password,
              },
            })}
          />
          {errors.password && (
            <AlertWrapper
              showIcon
              message={`${errors.password.message}`}
              type="error"
            />
          )}
        </Row>
        <ButtonWrapper type="primary" htmlType="submit">
          Entrar
        </ButtonWrapper>
      </Form>
      <Text>
        Não tem conta? <LinkWrapper to="/cadastre-se">Criar conta</LinkWrapper>
      </Text>
    </FormWrapper>
  );
};
