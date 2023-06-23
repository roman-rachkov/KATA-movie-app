import React from 'react'
import { Rate } from 'antd'
import PropTypes from 'prop-types'

const StarRating = ({ rating, changeRatingHandler }) => {
  return (
    <Rate allowHalf defaultValue={rating} count={10} style={{ margin: 'auto 0 0' }} onChange={changeRatingHandler} />
  )
}

StarRating.propTypes = {
  rating: PropTypes.number,
  changeRatingHandler: PropTypes.func,
}

StarRating.defaultProps = {
  rating: 0,
  changeRatingHandler: {},
}

export default StarRating
