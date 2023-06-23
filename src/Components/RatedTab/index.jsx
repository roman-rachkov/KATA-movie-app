import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, Pagination, Row, Spin } from 'antd'

import FilmList from '../FilmList'
import { Context } from '../../Context'
import { useFetch } from '../../Hooks/useFetch.js'

const RatedTab = () => {
  const [films, setFilms] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const { movie } = useContext(Context)

  const [getRatedFilms, isLoading, error] = useFetch(async () => {
    await movie.GetRatedFilms().then((r) => {
      console.log(r)
      setFilms(r.results)
      setTotalItems(r.total_results)
    })
  })

  useEffect(() => {
    getRatedFilms()
  }, [currentPage])

  return (
    <>
      <Col offset={4} span={16}>
        {error && <Alert type={'error'} message={error} style={{ margin: '10px auto' }} />}
        {isLoading ? (
          <Row>
            <Spin tip={'Loading...'} style={{ margin: '10px auto' }} />
          </Row>
        ) : (
          <>
            <FilmList films={films} />
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
                setCurrentPage(page)
              }}
              itemRender={(page, type, originElement) => {
                if (page === currentPage && type === 'page') {
                  return <a style={{ backgroundColor: '#4096ff', color: '#fff' }}>{page}</a>
                }
                return originElement
              }}
            />
          </>
        )}
      </Col>
    </>
  )
}

export default RatedTab
