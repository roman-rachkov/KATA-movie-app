import axios from 'axios'
const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWIyMTYzMjg5NWE2ZTk4MjIyNWFhZTMwMTcyNWU0MCIsInN1YiI6IjY0MmU3YzRjMGQyZjUzMDExMzYxYThjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f57i_UdM8jSquK00XPM3sjIMuSbI7BxaQXWrNJosjEE'
const baseURL = 'https://api.themoviedb.org/3/'

const RequestApi = async (path, params = {}, method = 'GET') => {
  return await axios.request({
    baseURL,
    method,
    params,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
}

export default RequestApi
