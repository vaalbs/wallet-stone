import React from "react";
import { useForm } from "react-hook-form";
import firebaseRef from "../../service/firebase";
import {
  ButtonWrapper,
  Form,
  FormWrapper,
  InputWrapper,
  LinkWrapper,
  Span,
  Text,
  Title,
} from "../../styles/Auth/styled";
import { Error } from "../../styles/Error/styled";
import { Label, Row } from "../../styles/Form/styled";
import { PATTERNS, VALIDATION_MESSAGE } from "../../utils/patterns";

interface IFormFields {
  login: string;
  password: string;
}

export const SignUp = () => {
  const { register, handleSubmit, errors } = useForm<IFormFields>();

  const onSubmit = (values: IFormFields) => {
    firebaseRef
      .auth()
      .createUserWithEmailAndPassword(values.login, values.password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  return (
    <FormWrapper>
      <Title>Cadastre-se para criar sua carteira</Title>
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
          {errors.login && <Error>{errors.login.message}</Error>}
        </Row>
        <Row>
          <Label>
            Senha{" "}
            <Span>
              (Sua senha deve ter letras, números e no mínimo 8 caracteres.)
            </Span>
          </Label>
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
          {errors.password && <Error>{errors.password.message}</Error>}
        </Row>
        <ButtonWrapper type="primary" htmlType="submit">
          Entrar
        </ButtonWrapper>
      </Form>
      <Text>
        Já possuo conta.{" "}
        <LinkWrapper to="/entrar">Clique para entrar</LinkWrapper>
      </Text>
    </FormWrapper>
  );
};
