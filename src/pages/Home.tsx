import { Layout, Menu } from "antd"
import logoHeader from "../images/tractian-logo.png"
import Assets from "../components/sections/Assets"
import { colors } from "../utils/colors"
import "./Home.css"

function Home() {
  const { Header, Content, Footer } = Layout

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
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
        <Menu
          style={{ background: "transparent" }}
          mode="horizontal"
          defaultSelectedKeys={["2"]}
        >
          <Menu.Item key="1" className="hoverItem">
            <span style={{ color: colors.textSecondary }}>Ativos</span>
          </Menu.Item>
          <Menu.Item key="1" className="hoverItem">
            <span style={{ color: colors.textSecondary }}>Empresas</span>
          </Menu.Item>
          <Menu.Item key="1" className="hoverItem">
            <span style={{ color: colors.textSecondary }}>Usuários</span>
          </Menu.Item>
        </Menu>
      </Header>

      <Content>
        <Assets />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default Home
