import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .ant-modal {
    border-radius: 6px;
  }

  .ant-modal-header {
    border-bottom: 0;
    padding: 24px 24px 4px 24px;
  }

  .ant-modal-footer {
    border-top: 0;
    padding: 12px 24px 24px 24px;
  }

  .ant-btn {
    border-color: #bec4c9;
    border-radius: 4px;
    height: 38px;
    padding: 8px 16px;

    &:hover,
    &:focus {
      color: inherit;
      background-color: inherit;
      border-color: #bec4c9;
    }
  }

  .ant-btn-primary {
    background-color: #431fa8;
    border-color: inherit;

    &:hover,
    &:focus {
      color: #fff;
      background-color: #431fa8;
      border-color: inherit;
    }
  }
`;
