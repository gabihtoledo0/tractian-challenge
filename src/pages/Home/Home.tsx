import { Layout, Menu } from "antd"
import Assets from "../../components/Sections/Assets"
import { colors } from "../../utils/colors"
import HeaderComponent from "../../components/Header/Header"
import CompaniesUnitsAndUsers from "../../components/Sections/CompaniesUnitsAndUsers"
import "./Home.css"
import WorkOrders from "../../components/Sections/WorkOrders"

function Home() {
  const { Content } = Layout

  return (
    <Layout>
      <HeaderComponent>
        <Menu
          style={{ background: "transparent", borderBottom: 0 }}
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
        <CompaniesUnitsAndUsers />
        <WorkOrders />
      </Content>
    </Layout>
  )
}

export default Home
