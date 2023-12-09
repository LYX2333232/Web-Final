import axios from 'axios'

// 获取商品列表
export const getGoodsList = async () => axios.get('/api/getGoods')

// 获取商品详情
export const getGoodDetail = async (id) => axios.get(`/api/getDetail?id=${id}`)

// 购买商品
export const buyGood = async (data) => axios.post(`/api/buy`, data)

// 加入购物车
export const addToCart = async (data) => axios.post(`/api/addToCart`, data)

// 记录浏览记录
export const recordBrowse = async (data) => axios.post(`/api/postBrowse`, data)
