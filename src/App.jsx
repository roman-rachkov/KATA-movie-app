import React, { useLayoutEffect, useState } from 'react'
import { Alert, Col, ConfigProvider, Layout, Pagination, Row, Spin, Tabs } from 'antd'

import { MovieService } from './Services'
import { Context } from './Context'
import SearchTab from './Components/SearchTab'
import RatedTab from './Components/RatedTab'
import FilmList from './Components/FilmList/index.jsx'

const { Content } = Layout

const App = () => {
  const [movie] = useState(new MovieService())
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [error, setError] = useState(false)
  const [ratedFilms, setRatedFilms] = useState([])

  const changeRatingHandler = (filmId, rating) => {
    setRatedFilms((oldState) => [...oldState.filter((film) => film.id !== filmId), { id: filmId, rating }])
  }

  useLayoutEffect(() => {
    const createSession = async () => await movie.CreateGuestSession()
    createSession()
  }, [])

  const tabs = [
    {
      key: 1,
      label: 'Search',
      children: (
        <SearchTab
          setFilms={setFilms}
          setIsLoading={setIsLoading}
          currentPage={currentPage}
          setTotalItems={setTotalItems}
          setError={setError}
          ratedFilms={ratedFilms}
        />
      ),
    },
    {
      key: 2,
      label: 'Rated',
      children: (
        <RatedTab
          setFilms={setFilms}
          setIsLoading={setIsLoading}
          currentPage={currentPage}
          setTotalItems={setTotalItems}
          setError={setError}
        />
      ),
    },
  ]

  const paginationItemRender = (page, type, originElement) => {
    if (page === currentPage && type === 'page') {
      return <a style={{ backgroundColor: '#4096ff', color: '#fff' }}>{page}</a>
    }
    return originElement
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 12,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <Context.Provider
        value={{
          movie,
        }}
      >
        <Layout style={{ backgroundColor: '#fff' }}>
          <Content>
            <Col offset={4} span={16}>
              <Tabs
                defaultActiveKey={1}
                items={tabs}
                style={{ background: '#fff', justifyContent: 'center' }}
                destroyInactiveTabPane={true}
                onChange={() => {
                  setIsLoading(true)
                  setCurrentPage(1)
                }}
              />

              <>
                {isLoading ? (
                  <Row>
                    <Spin tip={'Loading...'} style={{ margin: '10px auto' }} />
                  </Row>
                ) : (
                  <>
                    <FilmList films={films} setRatingHandler={changeRatingHandler} />
                    <Pagination
                      defaultCurrent={1}
                      current={currentPage}
                      total={totalItems}
                      defaultPageSize={20}
                      showQuickJumper={false}
                      showSizeChanger={false}
                      hideOnSinglePage={true}
                      style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                      onChange={(page) => {
                        setIsLoading(true)
                        setCurrentPage(page)
                      }}
                      itemRender={paginationItemRender}
                    />
                  </>
                )}
              </>
              {error && <Alert type={'error'} message={error} style={{ margin: '10px auto' }} />}
            </Col>
          </Content>
        </Layout>
      </Context.Provider>
    </ConfigProvider>
  )
}

export default App
