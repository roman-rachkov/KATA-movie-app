import { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Context } from '../../context'
import { useFetch } from '../../hooks'

const RatedTab = ({ currentPage, setFilms, setIsLoading, setError, setTotalItems }) => {
  const { movie } = useContext(Context)

  const [getRatedFilms, isLoading, error] = useFetch(async () => {
    await movie.getRatedFilms(currentPage).then((response) => {
      setFilms(response.results)
      setTotalItems(response.total_results)
    })
  })

  useEffect(() => {
    getRatedFilms()
  }, [currentPage])

  useEffect(() => {
    setError(error)
  }, [error])

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

  return null
}

RatedTab.propTypes = {
  currentPage: PropTypes.number,
  setFilms: PropTypes.func,
  setIsLoading: PropTypes.func,
  setError: PropTypes.func,
  setTotalItems: PropTypes.func,
}

RatedTab.defaultProps = {
  currentPage: 1,
  setFilms: {},
  setIsLoading: {},
  setError: {},
  setTotalItems: {},
}

export default RatedTab
