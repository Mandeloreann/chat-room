import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = user => {
  return axios({
    method: 'POST',
    url: apiUrl + '/chats',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { chat: this.state.chat.text }
  })
}
