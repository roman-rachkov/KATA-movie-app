import { useContext, useEffect } from 'react'

import { Context } from '../../Context'
import { useFetch } from '../../Hooks/useFetch.js'

const RatedTab = ({ setFilms, setIsLoading, setError, currentPage, setTotalItems }) => {
  const { movie } = useContext(Context)

  const [getRatedFilms, isLoading, error] = useFetch(async () => {
    await movie.GetRatedFilms(currentPage).then((r) => {
      setFilms(r.results)
      setTotalItems(r.total_results)
    })
  })

  useEffect(() => {
    getRatedFilms()
      .then(() => {})
      .catch(() => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(isLoading)
      })
  }, [currentPage])

  return null
}

export default RatedTab
