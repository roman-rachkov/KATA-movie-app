import React, { useEffect, useState } from 'react'
import { Alert, Col, ConfigProvider, Layout, Pagination, Row, Spin, Tabs } from 'antd'

import { MovieService } from './services'
import { Context } from './context'
import SearchTab from './components/SearchTab'
import RatedTab from './components/RatedTab'
import FilmList from './components/FilmList'
import { useFetch } from './hooks'

const { Content } = Layout

const App = () => {
  const [movie] = useState(new MovieService())
  const [genres, setGenres] = useState([])
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [error, setError] = useState(false)
  const [ratedFilms, setRatedFilms] = useState([])

  const changeRatingHandler = async (filmId, rating) => {
    setRatedFilms((oldState) => [...oldState.filter((film) => film.id !== filmId), { id: filmId, rating }])
    await movie.addRatingToFilm(filmId, rating).catch((exception) => setError(exception.message))
  }

  const [getGenres, genreLoading, genreError] = useFetch(
    async () =>
      await movie.getGenreList().then((response) => {
        setGenres(response.genres)
      })
  )

  useEffect(() => {
    const createSession = async () => await movie.createGuestSession()
    createSession()
    getGenres()
  }, [])

  useEffect(() => {
    setIsLoading(genreLoading)
  }, [genreLoading])

  useEffect(() => {
    setError(genreError)
  }, [genreError])

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

  const changeTabHandler = () => {
    setFilms([])
    setIsLoading(true)
    setCurrentPage(1)
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
          genres,
        }}
      >
        <Layout style={{ backgroundColor: '#fff' }}>
          <Content>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 14, offset: 4 }}>
              <Tabs
                defaultActiveKey={1}
                items={tabs}
                style={{ background: '#fff', justifyContent: 'center' }}
                destroyInactiveTabPane={true}
                onChange={changeTabHandler}
              />

              <>
                {error && <Alert type={'error'} message={error} style={{ margin: '10px auto' }} />}
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
            </Col>
          </Content>
        </Layout>
      </Context.Provider>
    </ConfigProvider>
  )
}

export default App
