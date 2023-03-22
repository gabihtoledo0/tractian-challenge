import { Layout } from "antd"
import Assets from "../../components/Sections/Assets"
import CompaniesUnitsAndUsers from "../../components/Sections/CompaniesUnitsAndUsers"
import WorkOrders from "../../components/Sections/WorkOrders"
import HeaderComponent from "../../components/Header/Header"
import "./Home.css"

function Home() {
  const { Content } = Layout

  return (
    <Layout>
      <HeaderComponent />
      <Content>
        <Assets />
        <CompaniesUnitsAndUsers />
        <WorkOrders />
      </Content>
    </Layout>
  )
}

export default Home
