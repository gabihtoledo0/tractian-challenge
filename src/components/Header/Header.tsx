import { Layout } from "antd"
import { colors } from "../../utils/colors"
import logoHeader from "../../images/tractian-logo.png"

type HeaderComponentProps = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode
}

export default function HeaderComponent({ children }: HeaderComponentProps) {
  const { Header } = Layout

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        borderBottom: "1px solid rgb(163 163 163)",
        background: `linear-gradient(90deg, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 35%)`,
      }}
    >
      <div
        style={{
          float: "left",
          display: "flex",
          height: "100%",
          alignItems: "center",
          marginRight: "28px",
        }}
      >
        <img
          src={logoHeader}
          alt="logo-tractian"
          height={25}
          className="filter-img"
        />
      </div>
      {children}
    </Header>
  )
}
