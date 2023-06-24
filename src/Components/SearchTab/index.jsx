import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import { Context } from '../../Context'
import { useFetch } from '../../Hooks/useFetch.js'

const SearchTab = ({ setFilms, setIsLoading, setError, currentPage, setTotalItems, ratedFilms }) => {
  const [queryString, setQueryString] = useState('')

  const { movie } = useContext(Context)

  const [searchFilms, isLoading, error] = useFetch(async () => {
    await movie.Search(queryString, currentPage).then((response) => {
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

  useEffect(() => {
    searchFilms()
      .then(() => {})
      .catch(() => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(isLoading)
      })
  }, [currentPage, queryString])

  const queryInputHandler = (event) => {
    setQueryString(event.target.value)
  }
  const debouncedQueryInputHandler = debounce(queryInputHandler, 600, { maxWait: 1000 })

  return <Input placeholder="Type to search..." onChange={debouncedQueryInputHandler} style={{ marginTop: '20px' }} />
}

export default SearchTab
