/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import ClipLoader from "react-spinners/ClipLoader"
import { Col } from "antd"
import { colors } from "../../utils/colors"
import ImgError from "../../images/error.svg"

type ErrorProps = {
  data: any
  loading: boolean
  light?: boolean
  children: JSX.Element
}

export default function Error({
  data,
  loading,
  children,
  light = false,
}: ErrorProps) {
  if (loading) {
    return (
      <ClipLoader
        color={colors.titlePrimary}
        loading={loading}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: colors.buttonPrimary,
        }}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    )
  }
  if (loading === false && data === undefined) {
    return (
      <>
        <Col span={8} style={{ alignItems: "center" }}>
          <h1
            style={{
              fontSize: "40px",
              color: light ? colors.textSecondary : colors.titlePrimary,
              fontWeight: "600",
            }}
          >
            Ops, algo aconteceu ;(
          </h1>

          <p
            style={{
              color: light ? colors.textSecondary : colors.titlePrimary,
              fontSize: "20px",
            }}
          >
            Parece que algo aconteceu em nossos sistemas, tente novamente daqui
            uns minutos.{" "}
          </p>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          span={15}
          offset={1}
        >
          <img src={ImgError} alt="ilustração-erro" height={250} />
        </Col>
      </>
    )
  }
  return children
}
