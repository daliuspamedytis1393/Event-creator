import axios from 'axios'
import NProgress from 'nprogress' // this is loading bar
// this is single axios instance for our app
const apiClient = axios.create({ 
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(config => {
  NProgress.start()  //When request is about to go out.start the progress bar
  return config
})

apiClient.interceptors.response.use(response => {
  NProgress.done()  //When response returns, finish the progress bar
  return response
})

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
