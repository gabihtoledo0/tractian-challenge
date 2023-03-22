import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Row, Col, Divider } from "antd"
import { colors } from "../../utils/colors"
import ImgCompanies from "../../images/companies.svg"
import { CompanyProps, UserProps, UnitProps } from "../../utils/types"

export default function CompaniesUnitsAndUsers() {
  const [companies, setCompanies] = useState<CompanyProps[]>()
  const [units, setUnits] = useState<UnitProps[]>()
  const [users, setUsers] = useState<UserProps[]>()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_COMPANIES}`)
      .then((response: AxiosResponse) => {
        setCompanies(response.data)
      })

    axios
      .get(`${process.env.REACT_APP_BASE_URL_UNITS}`)
      .then((response: AxiosResponse) => {
        setUnits(response.data)
      })

    axios
      .get(`${process.env.REACT_APP_BASE_URL_USERS}`)
      .then((response: AxiosResponse) => {
        setUsers(response.data)
      })
  }, [])

  return (
    <Row style={{ background: colors.backgroundDegrade, padding: "32px" }}>
      <Col span={14}>
        <Row>
          <Col>
            <h3
              style={{
                fontWeight: 600,
                fontSize: "26px",
                color: colors.textSecondary,
              }}
            >
              Usuários
            </h3>
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }} />

        {users?.map((user) => (
          <>
            <Row>
              <>
                <Col span={6}>
                  <p style={{ fontWeight: 400, color: colors.textSecondary }}>
                    Nome
                  </p>
                  <div style={{ marginTop: "8px" }} />
                  <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
                    {user.name}
                  </p>
                </Col>

                <Col span={8}>
                  <p style={{ fontWeight: 400, color: colors.textSecondary }}>
                    Email
                  </p>
                  <div style={{ marginTop: "8px" }} />
                  <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
                    {user.email}
                  </p>
                </Col>

                <Col span={6}>
                  <p style={{ fontWeight: 400, color: colors.textSecondary }}>
                    Unidade
                  </p>
                  <div style={{ marginTop: "8px" }} />
                  {units?.map(
                    (unit) =>
                      unit.id === user.unitId && (
                        <p
                          style={{
                            color: colors.textSecondary,
                            fontSize: "14px",
                          }}
                        >
                          {unit.name}
                        </p>
                      )
                  )}
                </Col>
              </>
            </Row>
            <Divider style={{ margin: "12px 0" }} />
          </>
        ))}
        <div style={{ marginTop: "32px" }} />

        <Row>
          <Col>
            <h3
              style={{
                fontWeight: 600,
                fontSize: "26px",
                color: colors.textSecondary,
              }}
            >
              Unidades
            </h3>
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }} />

        {units?.map((unit) => (
          <>
            <Row>
              <Col span={6}>
                <p style={{ fontWeight: 400, color: colors.textSecondary }}>
                  Nome
                </p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
                  {unit.name}
                </p>
              </Col>

              <Col span={7}>
                <p style={{ fontWeight: 400, color: colors.textSecondary }}>
                  Empresa
                </p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
                  {companies?.map(
                    (company) =>
                      unit.id === company.id && (
                        <p
                          style={{
                            color: colors.textSecondary,
                            fontSize: "14px",
                          }}
                        >
                          {company.name}
                        </p>
                      )
                  )}
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: "12px 0" }} />
          </>
        ))}
        <div style={{ marginTop: "32px" }} />

        <Row>
          <Col>
            <h3
              style={{
                fontWeight: 600,
                fontSize: "26px",
                color: colors.textSecondary,
              }}
            >
              Empresas
            </h3>
          </Col>

          
        </Row>
        <div style={{ marginTop: "20px" }} />

        {companies?.map((company) => (
          <>
            <Row>
              <Col span={6}>
                <p style={{ fontWeight: 400, color: colors.textSecondary }}>
                  Nome
                </p>
                <div style={{ marginTop: "8px" }} />
                <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
                  {company.name}
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: "12px 0" }} />
          </>
        ))}
      </Col>

      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        span={9}
        offset={1}
      >
        <img src={ImgCompanies} alt="ilustração-empresa" />
      </Col>
    </Row>
  )
}
