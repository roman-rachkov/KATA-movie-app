import React from 'react'
import { Rate } from 'antd'
import PropTypes from 'prop-types'

const StarRating = ({ rating, changeRatingHandler, className }) => {
  return <Rate allowHalf defaultValue={rating} rootClassName={className} count={10} onChange={changeRatingHandler} />
}

StarRating.propTypes = {
  rating: PropTypes.number,
  changeRatingHandler: PropTypes.func,
  className: PropTypes.string,
}

StarRating.defaultProps = {
  rating: 0,
  changeRatingHandler: {},
  className: '',
}

export default StarRating
