import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = (chat, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/chats',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { chat }
  })
}
