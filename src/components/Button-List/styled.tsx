import styled from "styled-components";

export const ButtonWrapper = styled.section`
  align-items: center;
  column-gap: 12px;
  display: grid;
  grid-template-columns: auto auto auto;
`;

export const ButtonsList = styled.div``;

export const Button = styled.button`
  align-items: center;
  background-color: ${(props) => props.theme.color.purpleDark};
  border: 0;
  border-radius: 4px;
  color: ${(props) => props.theme.color.white};
  cursor: pointer;
  display: flex;
  height: 36px;
  padding: 8px 12px;

  svg {
    height: 18px;
    width: 18px;
  }
`;

export const ButtonName = styled.span`
  padding-left: 8px;
`;
