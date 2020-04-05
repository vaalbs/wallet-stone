import { Spin } from "antd";
import styled from "styled-components";

export const LoadingWrapper = styled(Spin)`
  display: flex;
  justify-content: center;

  svg {
    fill: ${(props) => props.theme.color.secondary};
    height: 40px;
    width: 40px;
  }
`;
