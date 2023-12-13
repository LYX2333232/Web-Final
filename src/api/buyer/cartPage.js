import axios from 'axios'

export const getAll = async (id) => axios.get('/api/getCartInfo?buyerId=' + id)

export const deleteItem = async (id) => axios.delete('/api/deleteCartInfo?id=' + id)

export const changeNumber = async (data) => axios.post('/api/changeNumber', data)
