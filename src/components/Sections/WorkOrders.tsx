import { Row, Col, Table, Tag, Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { colors } from "../../utils/colors"
import Error from "../Error/Error"
import { AssetProps, WorkOrderProps } from "../../utils/types"
import { statusWorkOrder, priorityWorkOrder } from "../../utils/translate"

export default function WorkOrders() {
  const [loading, setLoading] = useState<boolean>(true)
  const [workOrders, setWorkOrders] = useState<WorkOrderProps[]>()
  const [assets, setAssets] = useState<AssetProps[]>()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_WORKORDERS}`)
      .then((response: AxiosResponse) => {
        setWorkOrders(response.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

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
  }, [workOrders])

  const columns: ColumnsType<WorkOrderProps> = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ativo",
      dataIndex: "assetId",
      key: "assetId",
      render: (assetId: number) =>
        assets?.find((asset: AssetProps) => asset.id === assetId)?.name,
    },
    {
      title: "Prioridade",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => priorityWorkOrder[priority],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "completed" ? "success" : "processing"}>
          {statusWorkOrder[status]}
        </Tag>
      ),
    },
    {
      title: "Checklist",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          style={{
            backgroundColor: colors.buttonPrimary,
            width: "fit-content",
          }}
          size="large"
          onClick={() => navigate(`/ordens-de-servico/${record.id}`)}
        >
          Detalhes
        </Button>
      ),
    },
  ]

  return (
    <Row
      style={{
        backgroundColor: colors.backgroundDefault,
        padding: "32px",
      }}
    >
      <Error loading={loading} data={workOrders}>
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
                Ordens de Serviço
              </h1>
            </div>
          </Col>

          <Col span={16} style={{ display: "flex", justifyContent: "center" }}>
            <Table
              columns={columns}
              dataSource={workOrders}
              loading={workOrders === undefined}
              pagination={{
                defaultCurrent: 1,
                total: workOrders?.length,
                defaultPageSize: 4,
              }}
              bordered
            />
          </Col>
        </>
      </Error>
    </Row>
  )
}
