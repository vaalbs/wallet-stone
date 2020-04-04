import { Tabs } from "antd";
import styled from "styled-components";

const { TabPane } = Tabs;

export const TabWrapper = styled(Tabs)<{
  tabColor?: string;
  tabColorHover?: string;
  tabActive?: string;
  tabLine?: string;
}>`
  .ant-tabs-tab {
    color: ${props =>
      props.tabColor ? props.tabColor : props.theme.color.gray};
    font-weight: 600;

    &:hover {
      color: ${props =>
        props.tabColorHover ? props.tabColorHover : props.theme.color.purple};
    }
  }

  .ant-tabs-tab-active {
    color: ${props =>
      props.tabActive ? props.tabActive : props.theme.color.purple};
  }

  .ant-tabs-ink-bar {
    background-color: ${props =>
      props.tabLine ? props.tabLine : props.theme.color.purple};
  }
`;

export const TabPaneWrapper = styled(TabPane)`
  margin-top: 24px;
`;
