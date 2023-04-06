import React from 'react'
import { Layout } from 'antd'

import FilmList from './components/filmList.jsx'

const { Header, Footer, Content } = Layout

const App = () => {
  return (
    <Layout>
      <Header></Header>
      <Layout>
        <Content>
          <FilmList />
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  )
}

export default App
