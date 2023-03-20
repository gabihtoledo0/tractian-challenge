import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios, { AxiosResponse } from "axios"
import { Row, Col, Tag, Divider } from "antd"
import { colors } from "../../utils/colors"
import HeaderComponent from "../../components/Header/Header"
import { AssetProps, UnitProps } from "../../utils/types"
import { status } from "../../utils/translate"

function Assets() {
  const [asset, setAsset] = useState<AssetProps>()
  const [unit, setUnit] = useState<UnitProps>()

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
  }, [asset])

  const statusColor = () => {
    
  }

  return (
    <>
      <HeaderComponent />
      <Row
        style={{ backgroundColor: colors.backgroundDefault, padding: "32px" }}
      >
        <Col span={16} style={{ alignItems: "center" }}>
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
              {asset?.name}
            </h1>

            <div style={{ marginTop: "24px" }} />

            <Row>
              <Col span={4}>
                <p style={{ fontWeight: 400 }}>Empresa</p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textPrimary }}>{unit?.name}</p>
              </Col>

              <Col span={4}>
                <p style={{ fontWeight: 400 }}>Modelo</p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textPrimary }}>{asset?.model}</p>
              </Col>

              <Col span={7}>
                <p style={{ fontWeight: 400 }}>IDs de usuário atribuídos</p>
                <div style={{ marginTop: "8px" }} />
                {asset?.assignedUserIds?.map((userId) => (
                  <Tag key={userId}>{userId}</Tag>
                ))}
              </Col>

              <Col span={6}>
                <p style={{ fontWeight: 400 }}>Sensores</p>
                <div style={{ marginTop: "8px" }} />
                {asset?.sensors?.map((sensor) => (
                  <Tag key={sensor}>{sensor}</Tag>
                ))}
              </Col>
            </Row>
            <Divider />

            <Row>
              <Col span={4}>
                <p style={{ fontWeight: 400 }}>Status</p>
                <div style={{ marginTop: "8px" }} />
                <Tag>
                  {Object.entries(status).find(([key, val]) => {
                    if (key === asset?.status) {
                      return val
                    }
                    return asset?.status
                  })}
                </Tag>
              </Col>
            </Row>
          </div>
        </Col>

        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <img src={asset?.image} alt="imagem-motor" height={250} />
        </Col>
      </Row>
    </>
  )
}

export default Assets
