import axios from 'axios'

// 获取用户信息
export const getInfo = (id) => axios.get('/api/getBuyerInfo?id=' + id)

// 更新用户信息
export const updateInfo = (data) => axios.post('/api/updateInfo', data)
