/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import { Card, Col } from "antd"
import Highcharts from "highcharts"
import ChartModuleMore from "highcharts/highcharts-more.js"
import HighchartsReact from "highcharts-react-official"
import HCDrillDown from "highcharts/modules/drilldown"
import HCPie from "highcharts/modules/variable-pie"
import { AssetProps } from "../../utils/types"

export default function GraphicsAssets({ assets }: { assets?: AssetProps[] }) {
  const status = assets?.map((asset) => asset.status)
  const counts: any = {}
  status?.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1
  })

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

  const optionsPie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Quantidade total de ativos em estados diferentes",
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          distance: 0,
          format:
            "<b style='font-size: 14px;word-wrap: break-word'>{point.name}</b>: <p style='font-size:11px'>Total: {point.y}<p>",
        },
        size: "60%",
      },
    },
    series: [
      {
        name: "Total",
        colorByPoint: true,
        data: [
          {
            name: "Em Alerta",
            y: counts.inAlert,
          },
          {
            name: "Em tempo de inatividade",
            y: counts.inDowntime,
          },
          {
            name: "Em operação",
            y: counts.inOperation,
          },
          {
            name: "Parada não planejada",
            y: counts.unplannedStop,
          },
          {
            name: "Parada planejada",
            y: counts.plannedStop,
          },
        ],
      },
    ],
  }

  ChartModuleMore(Highcharts)
  HCDrillDown(Highcharts)
  HCPie(Highcharts)

  return (
    <>
      <Col span={13}>
        <Card>
          <HighchartsReact
            isPureConfig
            highcharts={Highcharts}
            options={optionsColumn}
          />
        </Card>
      </Col>

      <Col span={10} offset={1}>
        <Card>
          <HighchartsReact
            isPureConfig
            highcharts={Highcharts}
            options={optionsPie}
          />
        </Card>
      </Col>
    </>
  )
}
