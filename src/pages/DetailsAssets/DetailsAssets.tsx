/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios, { AxiosResponse } from "axios"
import { Row, Col, Tag, Divider } from "antd"
import moment from "moment"
import { colors } from "../../utils/colors"
import HeaderComponent from "../../components/Header/Header"
import { AssetProps, UnitProps } from "../../utils/types"
import { statusAssets } from "../../utils/translate"
import Graphics from "../../components/Sections/Graphics"

function Assets() {
  const [asset, setAsset] = useState<AssetProps>()
  const [unit, setUnit] = useState<UnitProps>()
  const [company, setCompany] = useState<UnitProps>()

  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_ASSETS}/${id}`)
      .then((response: AxiosResponse) => {
        setAsset(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_UNITS}/${asset?.unitId}`)
      .then((response: AxiosResponse) => {
        setUnit(response.data)
      })

    axios
      .get(`${process.env.REACT_APP_BASE_URL_COMPANIES}/${asset?.companyId}`)
      .then((response: AxiosResponse) => {
        setCompany(response.data)
      })
  }, [asset])

  const statusColor = (statusAsset?: string) => {
    if (statusAsset === "inAlert" || statusAsset === "plannedStop") {
      return "orange"
    }
    if (statusAsset === "inDowntime") {
      return "cyan"
    }
    if (statusAsset === "inOperation") {
      return "green"
    }
    return "red"
  }

  return (
    <>
      <HeaderComponent />
      <Row
        style={{ backgroundColor: colors.backgroundDefault, padding: "32px" }}
      >
        <Col span={14} style={{ alignItems: "center" }}>
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
                {asset?.name}
              </h1>
              <div style={{ marginRight: "24px" }} />

              <Tag
                style={{
                  height: "fit-content",
                }}
                color={statusColor(asset?.status)}
                key={asset?.status}
              >
                {asset && statusAssets[asset.status]}
              </Tag>
            </Row>

            <div style={{ marginTop: "24px" }} />

            <Row>
              <Col span={7}>
                <p style={{ fontWeight: 400 }}>Empresa</p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                  {company?.name}
                </p>
              </Col>

              <Col span={7}>
                <p style={{ fontWeight: 400 }}>Unidade</p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                  {unit?.name}
                </p>
              </Col>

              <Col span={7}>
                <p style={{ fontWeight: 400 }}>Modelo</p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                  {asset?.model}
                </p>
              </Col>
            </Row>
            <Divider />

            <Row>
              <Col span={7}>
                <p style={{ fontWeight: 400 }}>Temperatura Máxima</p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                  {asset?.specifications?.maxTemp}
                </p>
              </Col>

              <Col span={7}>
                <p style={{ fontWeight: 400 }}>Sensores</p>
                <div style={{ marginTop: "8px" }} />
                {asset?.sensors?.map((sensor: string) => (
                  <Tag key={sensor}>{sensor}</Tag>
                ))}
              </Col>

              <Col span={7}>
                <p style={{ fontWeight: 400 }}>IDs de usuário atribuídos</p>
                <div style={{ marginTop: "8px" }} />
                {asset?.assignedUserIds?.map((userId) => (
                  <Tag key={userId}>{userId}</Tag>
                ))}
              </Col>
            </Row>
            <Divider />

            <Col>
              <Row>
                <Col>
                  <h3 style={{ fontWeight: 600, fontSize: "26px" }}>
                    Métricas
                  </h3>
                </Col>
              </Row>
              <div style={{ marginTop: "20px" }} />

              <Row>
                <Col span={7}>
                  <p style={{ fontWeight: 400 }}>Último tempo de atividade</p>
                  <div style={{ marginTop: "8px" }} />
                  <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                    {moment(asset?.metrics?.lastUptimeAt).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </p>
                </Col>

                <Col span={7}>
                  <p style={{ fontWeight: 400 }}>Tempo total de coleta</p>
                  <div style={{ marginTop: "8px" }} />
                  <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                    {asset?.metrics?.totalCollectsUptime
                      ? moment
                          .utc(asset.metrics.totalCollectsUptime * 1000)
                          .format("HH:mm:ss")
                      : "-"}
                  </p>
                </Col>

                <Col span={7}>
                  <p style={{ fontWeight: 400 }}>Tempo de atividade</p>
                  <div style={{ marginTop: "8px" }} />
                  <p style={{ color: colors.textPrimary, fontSize: "14px" }}>
                    {asset?.metrics?.totalUptime
                      ? moment
                          .utc(asset.metrics.totalUptime * 1000)
                          .format("HH:mm:ss")
                      : "-"}
                  </p>
                </Col>
              </Row>
            </Col>
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
          <img src={asset?.image} alt="imagem-motor" height={350} />
        </Col>
      </Row>

      <Row
        style={{
          background: `linear-gradient(90deg, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 35%)`,
          padding: "56px 32px",
          margin: 0,
        }}
        gutter={[32, 0]}
      >
        <Graphics asset={asset} />
      </Row>
    </>
  )
}

export default Assets
