import axios from 'axios'

export const getGoodDetail = (id) => axios.get('/api/getGoodDetail?id=' + id)
