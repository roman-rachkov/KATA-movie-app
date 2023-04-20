import React from 'react'
import { Card, Col, Typography } from 'antd'
import PropTypes from 'prop-types'
import { StarFilled, StarOutlined } from '@ant-design/icons'

import classes from './FilmCard.module.css'

const { Title, Text, Paragraph } = Typography

const ellipsisOverview = (text, words) => {
  const arr = text.split(' ')
  if (arr.length <= words) {
    return text
  }
  return arr.splice(0, words).join(' ') + ' ...'
}

const parseAndFormatDate = (dateString) =>
  new Date(Date.parse(dateString)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const FilmCard = ({ film }) => {
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
            className={classes['film-card__image']}
          ></img>
        }
        className={classes['film-card']}
      >
        <div className={classes['film-card__content']}>
          <Title level={3}>{film.title}</Title>
          <Text type={'secondary'}>{parseAndFormatDate(film.release_date)}</Text>
          <div className="film-card__genres">
            {film.genre_ids.map((g, i) => {
              return (
                <Text code key={i} className={classes['film-card__genre']}>
                  {g}
                </Text>
              )
            })}
          </div>
          <Paragraph>{ellipsisOverview(film.overview, 34)}</Paragraph>
          <div className="fil-card__stars">
            <StarOutlined />
            <StarFilled />
          </div>
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
  }),
}

FilmCard.defaultProps = {
  film: {},
}

export default FilmCard
