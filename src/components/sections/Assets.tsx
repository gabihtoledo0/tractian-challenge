import { Row, Col, Button, Table } from "antd"
import assets from "../../images/assets.svg"
import type { ColumnsType } from "antd/es/table"
import { colors } from "../../utils/colors"
import { useHistory } from "react-router-dom"

interface DataType {
  key: string
  id: number
  companyId: number
  healthscore: number
  model: string
  name: string
  status: string
}

function Assets() {
  let history = useHistory()

  const columns: ColumnsType<DataType> = [
    {
      title: "Empresa",
      dataIndex: "companyId",
      key: "companyId",
      render: (id: number) => id === 1 && "The Test Company",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      render: (id: number) => id === 1 && "The Test Company",
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
          onClick={() => history.push(`/ativos/${record.id}`)}
        >
          Detalhes
        </Button>
      ),
    },
  ]

  return (
    <Row style={{ backgroundColor: colors.backgroundDefault, padding: "32px" }}>
      <Col span={12} style={{ alignItems: "center" }}>
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
          <div style={{ margin: "12px" }} />
          <Button
            type="primary"
            style={{
              backgroundColor: colors.buttonPrimary,
              width: "fit-content",
            }}
            size="large"
          >
            Detalhes
          </Button>
        </div>
      </Col>

      <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
        <Table columns={columns} dataSource={data} />
        <img src={assets} alt="ativos" height={250} />
      </Col>
    </Row>
  )
}

export default Assets
