import { Row, Col, Button, Tag, Divider, Card } from "antd"
import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"
import { BsCheckCircleFill } from "react-icons/bs"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdArrowBack } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { colors } from "../../utils/colors"
import HeaderComponent from "../../components/Header/Header"
import Error from "../../components/Error/Error"
import { AssetProps, WorkOrderProps } from "../../utils/types"
import { statusWorkOrder, priorityWorkOrder } from "../../utils/translate"

export default function DetailsWorkOrders() {
  const [workOrder, setWorkOrder] = useState<WorkOrderProps>()
  const [asset, setAsset] = useState<AssetProps>()
  const [loading, setLoading] = useState<boolean>(true)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_WORKORDERS}/${id}`)
      .then((response: AxiosResponse) => {
        setWorkOrder(response.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_ASSETS}/${workOrder?.assetId}`)
      .then((response: AxiosResponse) => {
        setAsset(response.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [workOrder])

  return (
    <>
      <HeaderComponent />
      <Error loading={loading} data={workOrder} light>
        <Row
          style={{
            backgroundColor: colors.backgroundDefault,
            padding: "32px",
          }}
        >
          <Col span={14} style={{ alignItems: "center" }}>
            <Button
              style={{
                display: "flex",
                backgroundColor: colors.buttonPrimary,
              }}
              type="primary"
              onClick={() => navigate(-1)}
              icon={<MdArrowBack size={24} style={{ marginRight: "8px" }} />}
            >
              Voltar
            </Button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Row style={{ alignItems: "center" }}>
                <h1
                  style={{
                    fontSize: "40px",
                    color: colors.titlePrimary,
                    fontWeight: "600",
                  }}
                >
                  {workOrder?.title}
                </h1>
                <div style={{ marginRight: "24px" }} />

                <Tag
                  style={{
                    height: "fit-content",
                  }}
                  color={
                    workOrder?.status === "completed" ? "success" : "processing"
                  }
                  key={workOrder?.status}
                >
                  {workOrder && statusWorkOrder[workOrder.status]}
                </Tag>
              </Row>
              <div style={{ marginTop: "32px" }} />

              <Row>
                <p style={{ fontWeight: 400 }}>Descrição</p>
                <p style={{ color: colors.textPrimary, fontSize: "24px" }}>
                  {workOrder?.description}
                </p>
              </Row>
              <Divider />

              <Row>
                <Col span={7}>
                  <p style={{ fontWeight: 400 }}>Prioridade</p>
                  <div style={{ marginTop: "8px" }} />
                  <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                    {workOrder && priorityWorkOrder[workOrder?.priority]}
                  </p>
                </Col>

                <Col span={9}>
                  <p style={{ fontWeight: 400 }}>IDs de usuário atribuídos</p>
                  <div style={{ marginTop: "8px" }} />
                  {workOrder?.assignedUserIds?.map((userId) => (
                    <Tag key={userId}>{userId}</Tag>
                  ))}
                </Col>

                <Col span={7}>
                  <p style={{ fontWeight: 400 }}>Ativo</p>
                  <div style={{ marginTop: "8px" }} />
                  <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                    {asset?.name}
                  </p>
                </Col>
              </Row>
              <Divider />
            </div>
          </Col>

          <Col
            span={10}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card bordered={false}>
              <h2 style={{ fontSize: "24px", fontWeight: "600" }}>Checklist</h2>
              <Divider />
              {workOrder?.checklist.map((check, i) => {
                return (
                  <>
                    <Row style={{ alignItems: "center" }}>
                      <p>{check.task}</p>
                      <div style={{ margin: "6px" }} />
                      {check.completed ? (
                        <BsCheckCircleFill color={colors.buttonPrimary} />
                      ) : (
                        <AiOutlineLoading3Quarters />
                      )}
                    </Row>
                    {workOrder.checklist.length !== i + 1 && <Divider />}
                  </>
                )
              })}
            </Card>
          </Col>
        </Row>
      </Error>
    </>
  )
}
