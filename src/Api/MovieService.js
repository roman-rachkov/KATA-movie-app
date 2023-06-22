import axios from 'axios'

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWIyMTYzMjg5NWE2ZTk4MjIyNWFhZTMwMTcyNWU0MCIsInN1YiI6IjY0MmU3YzRjMGQyZjUzMDExMzYxYThjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f57i_UdM8jSquK00XPM3sjIMuSbI7BxaQXWrNJosjEE'
const baseURL = 'https://api.themoviedb.org/3/'

export default class MovieService {
  static async RequestApi(url, params = {}, method = 'GET') {
    return await axios
      .request({
        url,
        baseURL,
        method,
        params,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      .then((r) => {
        if (r.status === 200) {
          return r.data
        }
        throw new Error(`Something wrong: ${r.status}`)
      })
  }

  static async Search(query, page = 1) {
    return await this.RequestApi('search/movie', { query, page })
  }
}
