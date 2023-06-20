import React, { useEffect, useState } from 'react'
import { Alert, Col, ConfigProvider, Layout, Row, Spin } from 'antd'

import FilmList from './Components/FilmList'
import { useFetch } from './Hooks/useFetch.js'
import MovieService from './Api/MovieService.js'

const { Header, Footer, Content } = Layout

const App = () => {
  const [films, setFilms] = useState([])
  const [searchFilms, isLoading, error] = useFetch(async () => {
    await MovieService.Search('Batman').then((r) => {
      setFilms(r.results)
    })
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
              <Col offset={5} span={14}>
                {error && <Alert type={'error'} message={error} style={{ margin: '10px auto' }} />}
                {isLoading ? (
                  <Row>
                    <Spin tip={'Loading...'} style={{ margin: '10px auto' }} />
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
