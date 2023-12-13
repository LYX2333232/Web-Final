import axios from 'axios'

export const getGoodList = (data) => axios.get('/api/getGoodList', { params: data })

export const addGood = (data) => axios.post('/api/addGood', data)

export const deleteGood = (id) => axios.delete('/api/deleteGood?id=' + id)
