import React, { useEffect, useState } from 'react'
import { Alert, Col, ConfigProvider, Layout, Row, Spin, Pagination, Space, Input } from 'antd'
import { debounce } from 'lodash'

import FilmList from './Components/FilmList'
import { useFetch } from './Hooks/useFetch.js'
import MovieService from './Api/MovieService.js'

const { Header, Footer, Content } = Layout

const App = () => {
  const [films, setFilms] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [queryString, setQueryString] = useState('')
  const [searchFilms, isLoading, error] = useFetch(async () => {
    await MovieService.Search(queryString, currentPage).then((r) => {
      setFilms(r.results)
      setTotalItems(r.total_results)
    })
  })

  useEffect(() => {
    searchFilms()
  }, [currentPage, queryString])

  const queryInputHandler = (event) => {
    setQueryString(event.target.value)
  }
  const debouncedQueryInputHandler = debounce(queryInputHandler, 400, { maxWait: 1000 })

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
        <Header style={{ position: 'sticky', top: 0, left: 0, zIndex: 10 }}>
          <Input placeholder="Type to search..." onChange={debouncedQueryInputHandler} />
        </Header>
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
        <Footer>
          <Row>
            <Space direction={'horizontal'} style={{ width: '100%', justifyContent: 'center' }}>
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={totalItems}
                defaultPageSize={20}
                showQuickJumper={false}
                showSizeChanger={false}
                hideOnSinglePage={true}
                onChange={(page) => {
                  setCurrentPage(page)
                }}
                itemRender={(page, type, originElement) => {
                  if (page === currentPage && type === 'page') {
                    return <a style={{ backgroundColor: '#4096ff', color: '#fff' }}>{page}</a>
                  }
                  return originElement
                }}
              />
            </Space>
          </Row>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
