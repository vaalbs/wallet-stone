import styled from "styled-components";

export const HeaderWrapper = styled.section``;

export const ListWrapper = styled.div`
  align-items: flex-start;
  column-gap: 24px;
  display: grid;
  grid-template-columns: 180px 180px 180px 180px;
  margin-bottom: 28px;
`;

export const BlockWrapper = styled.div`
  &:first-child {
    p {
      font-size: 28px;
    }
  }
`;

export const Title = styled.span`
  color: ${(props) => props.theme.color.grayLight02};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Value = styled.p`
  align-items: flex-end;
  color: ${(props) => props.theme.color.primary};
  display: flex;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
`;

export const Prefix = styled.span`
  font-size: 14px;
  font-weight 600;
  padding-right: 8px;
`;
