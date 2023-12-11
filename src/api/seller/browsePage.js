import axios from "axios"

export const getBrowse = (data) => axios.get('/api/getBrowse', { params: data })