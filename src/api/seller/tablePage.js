import axios from "axios"

export const getTableList = (data) => axios.get('/api/getTable', { params: data })

export const getDetail = (id) => axios.get('/api/getTableDetail?id=' + id)