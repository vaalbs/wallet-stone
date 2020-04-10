import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const RecentTransactionsWrapper = styled.section`
  margin-top: 52px;
`;

export const RecentTransactionsList = styled.div`
  margin-top: 36px;
`;

export const RecentTransaction = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 170px auto 200px 100px;
  margin-bottom: 12px;
`;

export const DateHour = styled.p`
  color: ${(props) => props.theme.color.gray};
  font-weight: 600;
  margin-bottom: 0;
`;

export const Operation = styled.p`
  color: ${(props) => props.theme.color.primary};
  font-weight: 600;
  margin-bottom: 0;
`;

export const Amount = styled.p`
  color: ${(props) => props.theme.color.gray};
  font-weight: 600;
  margin-bottom: 0;
`;

export const Value = styled.p`
  color: ${(props) => props.theme.color.primary};
  font-weight: 600;
  margin-bottom: 0;
`;

export const IconBuy = styled(ArrowDownOutlined)`
  border: 2px solid;
  border-color: ${(props) => props.theme.color.purpleDark};
  border-radius: 100%;
  margin-right: 8px;
  padding: 6px;

  svg {
    fill: ${(props) => props.theme.color.purpleDark};
    height: 16px;
    width: 16px;
  }
`;

export const IconSell = styled(ArrowUpOutlined)`
  border: 2px solid;
  border-color: ${(props) => props.theme.color.secondary};
  border-radius: 100%;
  margin-right: 8px;
  padding: 6px;

  svg {
    fill: ${(props) => props.theme.color.secondary};
    height: 16px;
    width: 16px;
  }
`;
