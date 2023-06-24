import React, { useContext } from 'react'
import { Card, Col, Typography } from 'antd'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import StarRating from '../StarRating/index.jsx'
import { Context } from '../../Context'

import classes from './FilmCard.module.css'

const { Title, Text, Paragraph } = Typography

const ellipsisText = (text, words) => {
  const arr = text.split(' ')
  if (arr.length <= words) {
    return text
  }
  return arr.splice(0, words).join(' ') + ' ...'
}

const parseAndFormatDate = (dateString) => {
  const t = Date.parse(dateString)
  if (isNaN(t)) {
    return 'Unknown release date'
  }
  return format(t, 'PPP')
}

const FilmCard = ({ film, setRatingHandler }) => {
  const { movie } = useContext(Context)

  const changeRatingHandler = async (rating) => {
    await movie.AddRatingToFilm(film.id, rating).then(() => {
      setRatingHandler(film.id, rating)
    })
  }

  const ratingColor = () => {
    if (film.vote_average <= 3) return '#E90000'
    if (film.vote_average > 3 && film.vote_average <= 5) return '#E97E00'
    if (film.vote_average > 5 && film.vote_average <= 7) return '#E9D100'
    if (film.vote_average > 7) return '#66E900'
  }

  return (
    <Col span={12}>
      <Card
        cover={
          <img
            alt={film.title}
            src={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                : 'https://via.placeholder.com/200'
            }
            className={classes.filmCard__image}
          ></img>
        }
        className={classes.filmCard}
      >
        <div className={classes.filmCard__content}>
          <Title level={3} className={classes.filmCard__header}>
            {ellipsisText(film.title, 3)}
            <span className={classes.filmCard__rating} style={{ borderColor: ratingColor() }}>
              {film.vote_average.toFixed(1)}
            </span>
          </Title>
          {film.release_date && <Text type={'secondary'}>{parseAndFormatDate(film.release_date)}</Text>}
          {!!film.genre_ids.length && (
            <div className="film-card__genres">
              {film.genre_ids.map((g) => {
                return (
                  <Text code key={g} className={classes.filmCard__genre}>
                    {g}
                  </Text>
                )
              })}
            </div>
          )}
          <Paragraph>{ellipsisText(film.overview, 34)}</Paragraph>
          <StarRating rating={film.rating ?? 0} changeRatingHandler={changeRatingHandler} />
        </div>
      </Card>
    </Col>
  )
}

FilmCard.propTypes = {
  film: PropTypes.shape({
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
    rating: PropTypes.oneOfType([PropTypes.number]),
  }),
}

FilmCard.defaultProps = {
  film: {},
}

export default FilmCard
