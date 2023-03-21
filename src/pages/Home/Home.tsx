import { Layout, Menu } from "antd"
import Assets from "../../components/Sections/Assets"
import { colors } from "../../utils/colors"
import HeaderComponent from "../../components/Header/Header"
import "./Home.css"

function Home() {
  const { Content, Footer } = Layout

  return (
    <Layout>
      <HeaderComponent>
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
      </HeaderComponent>

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
