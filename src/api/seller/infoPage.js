import axios from 'axios'

export const getInfo = (sellerId) => axios.get('/api/getSellerInfo', { params: { sellerId } })

export const changeUsername = (data) => axios.post('/api/changeInfo', data)

export const changePassword = (data) => axios.post('/api/changeSellerPassword', data)
