/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react"
import { Row, Col, Button, Table, Tag, Space } from "antd"
import { IoBuild } from "react-icons/io5"
import { AiFillAlert } from "react-icons/ai"
import { BsFillSignStopFill } from "react-icons/bs"
import type { ColumnsType } from "antd/es/table"
import { useNavigate } from "react-router-dom"
import axios, { AxiosResponse } from "axios"
import { colors } from "../../utils/colors"
import { AssetProps } from "../../utils/types"
import { statusAssets } from "../../utils/translate"
import GraphicsAssets from "./GraphicsAssets"
import Error from "../Error/Error"

function Assets() {
  const navigate = useNavigate()

  const scoreColor = (score: number) =>
    score > 75 ? "green" : score >= 40 ? "warning" : "red"

  const columns: ColumnsType<AssetProps> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Empresa",
      dataIndex: "companyId",
      key: "companyId",
      render: (id: number) => id === 1 && <p>The Test Company</p>,
    },
    {
      title: "Health Score",
      dataIndex: "healthscore",
      key: "healthscore",
      render: (score: number) => (
        <Tag
          // eslint-disable-next-line no-nested-ternary
          color={scoreColor(score)}
        >
          <p style={{ fontWeight: "400" }}>{score}</p>
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Space>
          <p>{statusAssets[status]}</p>
          <div />
          {status === "inAlert" ? (
            <AiFillAlert size={20} color="orange" />
          ) : status === "inOperation" ? (
            <IoBuild size={20} color="#FFD700	" />
          ) : (
            <BsFillSignStopFill size={20} color="red" />
          )}
        </Space>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: colors.buttonPrimary,
            width: "fit-content",
          }}
          size="large"
          onClick={() => navigate(`/ativos/${record.id}`)}
        >
          Detalhes
        </Button>
      ),
    },
  ]

  const [assets, setAssets] = useState<AssetProps[]>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_ASSETS}`)
      .then((response: AxiosResponse) => {
        setAssets(response.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Row style={{ backgroundColor: colors.backgroundDefault, padding: "32px" }}>
      <Error loading={loading} data={assets}>
        <>
          <Col span={8} style={{ alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <h1
                style={{
                  fontSize: "40px",
                  color: colors.titlePrimary,
                  fontWeight: "600",
                }}
              >
                Ativos
              </h1>
              <h2
                style={{
                  fontSize: "24px",
                  color: colors.textPrimary,
                }}
              >
                Veja com mais detalhes as características dos ativos
              </h2>
            </div>
          </Col>

          <Col span={16} style={{ display: "flex", justifyContent: "center" }}>
            <Table
              columns={columns}
              dataSource={assets}
              loading={assets === undefined}
              pagination={{
                defaultCurrent: 1,
                total: assets?.length,
                defaultPageSize: 4,
              }}
              bordered
            />
          </Col>
          <div style={{ margin: "32px" }} />

          <Row style={{ width: "100%" }}>
            <GraphicsAssets assets={assets} />
          </Row>
        </>
      </Error>
    </Row>
  )
}

export default Assets
