import axios from 'axios'

// 获取商品列表
export const getGoodsList = async () => axios.get('/api/getGoods')

// 获取商品详情
export const getGoodDetail = async (id) => axios.get(`/api/getDetail?id=${id}`)
