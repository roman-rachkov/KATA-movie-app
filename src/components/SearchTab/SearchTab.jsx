import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

import { Context } from '../../context'
import { useFetch } from '../../hooks'

const SearchTab = ({ currentPage, setFilms, setIsLoading, setError, setTotalItems, ratedFilms }) => {
  const [queryString, setQueryString] = useState('')

  const { movie } = useContext(Context)

  const [searchFilms, isLoading, error] = useFetch(async () => {
    await movie.search(queryString, currentPage).then((response) => {
      const films = response.results.map((film) => {
        const ratedFilm = ratedFilms.find((ratedFilm) => ratedFilm.id === film.id)

        if (ratedFilm) {
          film.rating = ratedFilm.rating
        }
        return film
      })
      setFilms(films)
      setTotalItems(response.total_results)
    })
  })

  useLayoutEffect(() => {
    if (queryString.trim() === '') {
      return
    }
    searchFilms()
  }, [currentPage, queryString])

  useEffect(() => {
    setError(error)
  }, [error])

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

  const queryInputHandler = (event) => {
    setQueryString(event.target.value)
  }
  const debouncedQueryInputHandler = debounce(queryInputHandler, 600, { maxWait: 1000 })

  return <Input placeholder="Type to search..." onChange={debouncedQueryInputHandler} style={{ marginTop: '20px' }} />
}

SearchTab.propTypes = {
  currentPage: PropTypes.number,
  setFilms: PropTypes.func,
  setIsLoading: PropTypes.func,
  setError: PropTypes.func,
  setTotalItems: PropTypes.func,
  ratedFilms: PropTypes.array,
}

SearchTab.defaultProps = {
  currentPage: 1,
  setFilms: {},
  setIsLoading: {},
  setError: {},
  setTotalItems: {},
  ratedFilms: {},
}

export default SearchTab
