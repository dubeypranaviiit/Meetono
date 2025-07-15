import axios from 'axios'


export const getStreamToken = async (userId: string) => {
  try {
    const res = await axios.post('/api/stream-token', { userId })
    return res.data.token
  } catch (err) {
    console.error('getStreamToken error:', err)
    return null
  }
}