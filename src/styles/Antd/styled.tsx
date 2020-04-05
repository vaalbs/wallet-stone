import { Alert, Modal } from "antd";
import styled from "styled-components";

export const AlertWrapper = styled(Alert)`
  margin-top: 12px;
`;

export const ModalWrapper = styled(Modal)`
  border-radius: 6px;

  .ant-modal-header {
    border-bottom: 0;
    padding: 24px 24px 4px 24px;
  }

  .ant-modal-footer {
    border-top: 0;
    padding: 12px 24px 24px 24px;

    .ant-btn-primary {
      background-color: ${(props) => props.theme.color.purpleDark};
      border-color: inherit;

      &:hover,
      &:focus {
        color: ${(props) => props.theme.color.white};
        background-color: ${(props) => props.theme.color.purpleDark};
        border-color: inherit;
      }
    }
  }

  .ant-btn {
    border-color: ${(props) => props.theme.color.grayLight02};
    border-radius: 4px;
    height: 38px;
    padding: 8px 16px;

    &:hover,
    &:focus {
      color: inherit;
      background-color: inherit;
      border-color: ${(props) => props.theme.color.grayLight02};
    }
  }
`;
