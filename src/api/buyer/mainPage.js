import axios from 'axios'

export const getGoodsList = async () => axios.get('/api/getGoods')
