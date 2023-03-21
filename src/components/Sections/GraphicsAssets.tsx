/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import { Card, Col } from "antd"
import Highcharts from "highcharts"
import ChartModuleMore from "highcharts/highcharts-more.js"
import HighchartsReact from "highcharts-react-official"
import HCDrillDown from "highcharts/modules/drilldown"
import { AssetProps } from "../../utils/types"

export default function GraphicsAssets({ assets }: { assets?: AssetProps[] }) {
  const optionsColumn = {
    chart: {
      type: "column",
    },
    title: {
      text: "Pontuação de saúde dos ativos",
    },
    xAxis: {
      categories: assets?.map((asset) => asset.name),
    },
    yAxis: [
      {
        className: "highcharts-color-0",
        title: {
          text: "Score",
        },
      },
    ],
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> Score: <b>{point.y}</b><br/>',
    },
    series: assets?.map((asset) => ({
      name: asset.name,
      data: [asset.healthscore],
      pointPadding: 0.3,
    })),
  }

  ChartModuleMore(Highcharts)
  HCDrillDown(Highcharts)

  return (
    <Col>
      <Card>
        <HighchartsReact
          isPureConfig
          highcharts={Highcharts}
          options={optionsColumn}
        />
      </Card>
    </Col>
  )
}
