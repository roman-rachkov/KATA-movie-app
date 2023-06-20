import React from 'react'
import { Rate } from 'antd'
import PropTypes from 'prop-types'

const StarRating = ({ rating }) => {
  return <Rate allowHalf disabled defaultValue={rating} count={10} style={{ margin: 'auto 0 0' }} />
}

StarRating.propTypes = {
  rating: PropTypes.number,
}

StarRating.defaultProps = {
  rating: 0,
}

export default StarRating
