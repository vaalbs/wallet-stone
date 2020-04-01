import { Layout } from "antd";
import styled from "styled-components";

const { Footer } = Layout;

export const FooterWrapper = styled(Footer)`
  color: ${props => props.theme.color.gray};
  text-align: center;
`;
