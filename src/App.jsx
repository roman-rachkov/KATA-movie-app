import React, { useEffect, useState } from 'react'
import { Col, ConfigProvider, Layout, Row, Spin, Typography } from 'antd'

import FilmList from './Components/FilmList'
import { useFetch } from './Hooks/useFetch.js'
import MovieService from './Api/MovieService.js'

const { Header, Footer, Content } = Layout

const App = () => {
  const [films, setFilms] = useState([])
  const [searchFilms, isLoading, error] = useFetch(async () => {
    const res = await MovieService.Search('The Way')
    setFilms(res.results)
  })

  useEffect(() => {
    searchFilms()
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 12,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <Layout>
        <Header></Header>
        <Layout
          style={{
            background: '#fff',
          }}
        >
          <Content>
            <Row>
              <Col offset={6} span={12}>
                {error && <Typography.Text type={'danger'}>{error}</Typography.Text>}
                {isLoading ? (
                  <Row>
                    <Spin tip={'Loading...'} style={{ margin: '0 auto' }} />
                  </Row>
                ) : (
                  <FilmList films={films} />
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
