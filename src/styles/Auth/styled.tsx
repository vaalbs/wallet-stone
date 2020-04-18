import { Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../../styles/Form/styled";

export const FormWrapper = styled.section`
  background-color: ${(props) => props.theme.color.white};
  border-radius: 4px;
  box-shadow: 7px 5px 5px rgba(0, 0, 0, 0.1);
  margin: 100px auto 0 auto;
  max-width: 332px;
  padding: 32px;
  width: 100%;
`;

export const Form = styled.form``;

export const Title = styled.h1`
  color: ${(props) => props.theme.color.purpleDark};
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Span = styled.span`
  display: block;
  color: ${(props) => props.theme.color.grayLight02};
  fonst-size: 12px;
`;

export const InputWrapper = styled(Input)`
  width: 100%;
`;

export const Text = styled.p`
  color: ${(props) => props.theme.color.gray};
  margin-bottom: 0;
  margin-top: 24px;
`;

export const LinkWrapper = styled(Link)`
  color: ${(props) => props.theme.color.purple};
  font-weight: 600;
`;

export const ButtonWrapper = styled(Button)`
  margin-top: 8px;
`;
