import styled from "styled-components";

export const FormWrapper = styled.form``;

export const Label = styled.label`
  color: ${(props) => props.theme.color.gray};
  display: block;
  padding-bottom: 4px;
`;

export const Input = styled.input`
  border: 1px solid;
  border-color: ${(props) => props.theme.color.grayLight02};
  border-radius: 6px;
  height: 32px;
`;
