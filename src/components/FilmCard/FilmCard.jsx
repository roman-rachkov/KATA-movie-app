import React, { useContext } from 'react'
import { Card, Typography } from 'antd'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import StarRating from '../StarRating'
import { Context } from '../../context'

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
  const date = Date.parse(dateString)
  if (isNaN(date)) {
    return 'Unknown release date'
  }
  return format(date, 'PPP')
}

const FilmCard = ({ film, setRatingHandler }) => {
  const { genres } = useContext(Context)

  const changeRatingHandler = async (rating) => {
    setRatingHandler(film.id, rating)
  }

  const getGenreName = (genreId) => {
    const genre = genres.find((genreItem) => genreItem.id === genreId)
    return genre.name
  }

  const ratingColor = () => {
    if (film.vote_average <= 3) return '#E90000'
    else if (film.vote_average <= 5) return '#E97E00'
    else if (film.vote_average <= 7) return '#E9D100'
    else return '#66E900'
  }

  return (
    <Card
      cover={
        <img
          alt={film.title}
          src={
            film.poster_path ? `https://image.tmdb.org/t/p/w500/${film.poster_path}` : 'https://via.placeholder.com/200'
          }
          className={classes.filmCard__image}
        ></img>
      }
      className={classes.filmCard}
    >
      <div className={classes.filmCard__content}>
        <div className={classes.filmCard__headerWrapper}>
          <Title level={3} className={classes.filmCard__header}>
            {ellipsisText(film.title, 3)}
            <span className={classes.filmCard__rating} style={{ borderColor: ratingColor() }}>
              {film.vote_average.toFixed(1)}
            </span>
          </Title>
          {film.release_date && <Text type={'secondary'}>{parseAndFormatDate(film.release_date)}</Text>}
          {!!film.genre_ids.length && (
            <div className={classes.filmCard__genres}>
              {film.genre_ids.map((genreId) => {
                return (
                  <Text code key={genreId} className={classes.filmCard__genre}>
                    {getGenreName(genreId)}
                  </Text>
                )
              })}
            </div>
          )}
        </div>
        <div className={classes.filmCard__contentWrapper}>
          <Paragraph>{ellipsisText(film.overview, 34)}</Paragraph>
          <StarRating
            className={classes.filmCard__stars}
            rating={film.rating ?? 0}
            changeRatingHandler={changeRatingHandler}
          />
        </div>
      </div>
    </Card>
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
  }).isRequired,
}

FilmCard.defaultProps = {
  film: {},
}

export default FilmCard
