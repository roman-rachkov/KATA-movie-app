import axios from 'axios'

const apiKey = import.meta.env.VITE_TMDB_API_KEY
const baseURL = 'https://api.themoviedb.org/3/'

export default class MovieService {
  guestSessionId

  async RequestApi(url, data = {}, params = {}, method = 'GET') {
    return await axios
      .request({
        url,
        baseURL,
        method,
        data,
        params: {
          ...params,
          api_key: apiKey,
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      .then((r) => {
        return r.data
      })
  }

  async Search(query, page = 1) {
    return await this.RequestApi('search/movie', {}, { query, page })
  }

  async CreateGuestSession() {
    return await this.RequestApi('authentication/guest_session/new')
      .then((r) => {
        this.guestSessionId = r.guest_session_id
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async GetRatedFilms() {
    return await this.RequestApi(`guest_session/${this.guestSessionId}/rated/movies`)
  }

  async AddRatingToFilm(movieId, rating) {
    return await this.RequestApi(
      `movie/${movieId}/rating`,
      { value: rating },
      { guest_session_id: this.guestSessionId },
      'POST'
    )
  }
}
