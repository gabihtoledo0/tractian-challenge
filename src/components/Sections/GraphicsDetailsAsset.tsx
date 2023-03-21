/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import { Card, Col } from "antd"
import Highcharts from "highcharts"
import moment from "moment"
import ChartModuleMore from "highcharts/highcharts-more.js"
import HCSoldGauge from "highcharts/modules/solid-gauge"
import HCTimeline from "highcharts/modules/timeline"
import HighchartsReact from "highcharts-react-official"
import { statusAssets } from "../../utils/translate"
import { AssetProps } from "../../utils/types"

export default function GraphicsDetailsAsset({
  asset,
}: {
  asset?: AssetProps
}) {
  const optionsTimeline = {
    chart: {
      type: "timeline",
      height: "40%",
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    title: {
      text: "Histórico de saúde",
    },
    series: [
      {
        dataLabels: {
          connectorColor: "silver",
          connectorWidth: 2,
        },
        data: asset?.healthHistory
          ? asset?.healthHistory.map((history) => ({
              name: history.status && statusAssets[history.status],
              label: moment(history.timestamp).format("DD/MM/YYYY HH:mm:ss"),
            }))
          : [],
      },
    ],
  }
  const optionsGauge = {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: "90%",
    },

    title: {
      text: "Pontuação de Saúde",
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },
    yAxis: {
      min: 0,
      max: 100,
      tickPosition: "inside",
      tickColor: "#FFFFFF",
      tickLength: 70,
      tickWidth: 0,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      plotBands: [
        {
          from: 75,
          to: 100,
          color: "#55BF3B", // green
          thickness: 20,
        },
        {
          from: 74,
          to: 40,
          color: "#DDDF0D", // yellow
          thickness: 20,
        },
        {
          from: 39,
          to: 0,
          color: "#DF5353", // red
          thickness: 20,
        },
      ],
    },

    series: [
      {
        name: "Score",
        data: [asset?.healthscore],
        dataLabels: {
          format: "{y}",
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "16px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
  }

  ChartModuleMore(Highcharts)
  HCSoldGauge(Highcharts)
  HCTimeline(Highcharts)

  return (
    <>
      <Col span={8}>
        <Card>
          <HighchartsReact
            isPureConfig
            highcharts={Highcharts}
            options={optionsGauge}
          />
        </Card>
      </Col>

      <Col span={16}>
        <Card>
          <HighchartsReact
            isPureConfig
            highcharts={Highcharts}
            options={optionsTimeline}
          />
        </Card>
      </Col>
    </>
  )
}
