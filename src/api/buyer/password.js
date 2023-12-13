import axios from 'axios'

export const changePassword = (data) => axios.post('/api/changePassword', data)
