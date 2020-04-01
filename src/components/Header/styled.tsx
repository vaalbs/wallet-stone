import { BellOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

export const HeaderWrapper = styled(Header)`
  align-items: center;
  background-color: ${props => props.theme.color.primary};
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 25px 50px;
  justify-content: flex-end;
`;

export const BellIcon = styled(BellOutlined)`
  color: ${props => props.theme.color.gray};

  svg {
    height: 16px;
    width: 16px;
  }
`;

export const User = styled.img`
  border-radius: 100%;
  height: 30px;
  margin: 0 auto;
  object-fit: cover;
  width: 30px;
`;
