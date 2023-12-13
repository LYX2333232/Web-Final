import axios from 'axios'

export const getOrder = async (id) => axios.get('/api/getOrderInfo?id=' + id)

export const getAllOrders = async (id) => axios.get('/api/getAllOrders?buyerId=' + id)
