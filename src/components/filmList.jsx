import React, { useEffect } from 'react'

import RequestApi from '../api/movie.js'

const FilmList = () => {
  useEffect(async () => {
    console.log(await RequestApi('search/movie'))
  }, [])

  return <div></div>
}

export default FilmList
