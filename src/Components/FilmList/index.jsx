import React from 'react'
import { Row, Typography } from 'antd'
import PropTypes from 'prop-types'

import FilmCard from '../FilmCard'

import classes from './FilmList.module.css'

const { Text } = Typography

const FilmList = ({ films }) => {
  return (
    <Row className={classes['film-list']} gutter={[16, 16]}>
      {films.length ? (
        films.map((film) => <FilmCard key={film.id} film={film} />)
      ) : (
        <Text tip={'Loading...'}>No one film</Text>
      )}
    </Row>
  )
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.number,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.bool,
      vote_average: PropTypes.number,
      vote_count: PropTypes.number,
    })
  ),
}

FilmList.defaultProps = {
  films: [],
}

export default FilmList
