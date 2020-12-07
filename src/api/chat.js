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

export const chatIndex = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chats',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const chatDelete = (data, user) => {
  return axios({
    method: 'DELETE',
<<<<<<< HEAD
    url: apiUrl + '/chats',
=======
    url: apiUrl + '/chats/:id',
    // url: apiUrl + '/chats/' + data.chats._id
>>>>>>> 5f198f4... switching branches
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data
  })
}
