import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import firebaseRef from "../../service/firebase";
import {
  ButtonWrapper,
  Form,
  FormWrapper,
  InputWrapper,
  LinkWrapper,
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

interface IProps {
  onLogged: () => void;
}

export const Login = (props: IProps) => {
  const { register, handleSubmit, errors } = useForm<IFormFields>();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = (values: IFormFields) => {
    setErrorMessage("");
    setLoading(true);

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
        setErrorMessage(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  return (
    <FormWrapper>
      <Title>Acesse sua conta para ver sua carteira</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Label>E-mail</Label>
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
          {errors.password && <Error>{errors.password.message}</Error>}
        </Row>
        {errorMessage && <Error>{errorMessage}</Error>}
        <ButtonWrapper type="primary" htmlType="submit" loading={loading}>
          Entrar
        </ButtonWrapper>
      </Form>
      <Text>
        Não tem conta? <LinkWrapper to="/cadastre-se">Criar conta</LinkWrapper>
      </Text>
    </FormWrapper>
  );
};
