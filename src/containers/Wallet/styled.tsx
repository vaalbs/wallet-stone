import { Layout, Tabs } from "antd";
import styled from "styled-components";

const { Content } = Layout;
const { TabPane } = Tabs;

export const ContentWrapper = styled(Content)`
  padding: 60px 60px 0 60px;
  position: relative;
`;

export const TabWrapper = styled(Tabs)`
  .ant-tabs-tab {
    color: ${props => props.theme.color.gray};
    font-weight: 600;

    &:hover {
      color: ${props => props.theme.color.purple};
    }
  }

  .ant-tabs-tab-active {
    color: ${props => props.theme.color.purple};
  }

  .ant-tabs-ink-bar {
    background-color: ${props => props.theme.color.purple};
  }
`;

export const TabPaneWrapper = styled(TabPane)`
  margin-top: 24px;
`;

export const Line = styled.hr`
  border-top: 2px solid;
  border-top-color: ${props => props.theme.color.grayLight};
  border-left-color: ${props => props.theme.color.grayLight};
  position: absolute;
  top: 96px;
  width: calc(100% - 120px);
`;
