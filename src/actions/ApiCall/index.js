import axios from 'axios'
import { API_ROOT } from 'utilities/constants'

export const fetchBoardDetailt = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`, {
    'Content-Type': 'application/json'
  })
  return request.data
}
