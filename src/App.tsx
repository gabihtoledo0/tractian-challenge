import { Layout, Menu, theme } from "antd"
import logoHeader from "./images/tractian-logo.png"
import "./App.css"

function App() {
  const { Header, Content, Footer } = Layout
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "linear-gradient(90deg, rgba(30,58,138,1) 0%, rgba(37,99,235,1) 35%)",
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
          <img src={logoHeader} alt='logo-tractian' height={25} className='filter-img' />
        </div>
        <Menu style={{ background: "transparent" }} mode='horizontal' defaultSelectedKeys={["2"]}>
          <Menu.Item key='1' className='hoverItem'>
            <span style={{ color: "#fff" }}>Ativos</span>
          </Menu.Item>
          <Menu.Item key='1' className='hoverItem'>
            <span style={{ color: "#fff" }}>Empresas</span>
          </Menu.Item>
          <Menu.Item key='1' className='hoverItem'>
            <span style={{ color: "#fff" }}>Usuários</span>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>Content</div>
      </Content>

      <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  )
}

export default App
