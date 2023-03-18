/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react"
import { Row, Col, Button, Table, Tag, Space } from "antd"
import { IoBuild } from "react-icons/io5"
import { AiFillAlert } from "react-icons/ai"
import { BsFillSignStopFill } from "react-icons/bs"
import { RxCountdownTimer } from "react-icons/rx"
import type { ColumnsType } from "antd/es/table"
import { useNavigate } from "react-router-dom"
import axios, { AxiosResponse } from "axios"
import { colors } from "../../utils/colors"
import { AssetsProps } from "../../utils/types"

function Assets() {
  const navigate = useNavigate()

  const scoreColor = (score: number) =>
    score > 75 ? "green" : score >= 40 ? "warning" : "red"

  const columns: ColumnsType<AssetsProps> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <p style={{ fontWeight: "300" }}>{name}</p>,
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      render: (model: string) => <p style={{ fontWeight: "300" }}>{model}</p>,
    },
    {
      title: "Empresa",
      dataIndex: "companyId",
      key: "companyId",
      render: (id: number) =>
        id === 1 && <p style={{ fontWeight: "300" }}>The Test Company</p>,
    },
    {
      title: "Health Score",
      dataIndex: "healthscore",
      key: "healthscore",
      render: (score: number) => (
        <Tag
          // eslint-disable-next-line no-nested-ternary
          color={scoreColor(score)}
          key={score}
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
          <p style={{ fontWeight: "300" }}>{status}</p>
          <div />
          {status === "inAlert" ? (
            <AiFillAlert size={20} color="orange" />
          ) : status === "inDowntime" ? (
            <RxCountdownTimer size={20} />
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

  const [assets, setAssets] = useState<AssetsProps[]>()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_ASSETS}`)
      .then((response: AxiosResponse) => {
        setAssets(response.data)
      })
  }, [])

  return (
    <Row style={{ backgroundColor: colors.backgroundDefault, padding: "32px" }}>
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
              fontWeight: "300",
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
    </Row>
  )
}

export default Assets
