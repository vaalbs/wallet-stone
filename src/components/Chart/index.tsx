import Chart from "chart.js";
import React from "react";
import { TabPaneWrapper } from "../../styles/Tab/styled";
import { ChartWrapper, Tab } from "./styled";

export interface IChart {
  labels: string[];
  data: number[];
  tabTitle: string;
  reference: React.RefObject<HTMLCanvasElement>;
}

interface IProps {
  charts: IChart[];
}

export const ChartComponent = (props: IProps) => {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const myChartRef = props.charts[active].reference?.current?.getContext(
      "2d"
    );

    new Chart(myChartRef as CanvasRenderingContext2D, {
      type: "line",
      data: {
        labels: props.charts[active].labels,
        datasets: [
          {
            label: "# Valor",
            data: props.charts[active].data,
            backgroundColor: "#e2e7f1",
            borderColor: "#9557ffa3",
            borderWidth: 1
          }
        ]
      }
    });
  }, [active]);

  return (
    <ChartWrapper>
      <Tab
        defaultActiveKey="0"
        tabColor="#bec4c9"
        tabColorHover="#99a1a8"
        tabActive="#99a1a8"
        tabLine="#99a1a8"
        onChange={activeKey => setActive(activeKey as any)}
      >
        {props.charts.map((chart, index) => (
          <TabPaneWrapper
            tab={chart.tabTitle}
            key={`${index}`}
            forceRender={true}
          >
            <canvas id={`${index}`} ref={chart.reference} />
          </TabPaneWrapper>
        ))}
      </Tab>
    </ChartWrapper>
  );
};