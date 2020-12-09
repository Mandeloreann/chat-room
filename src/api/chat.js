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

export const chatDelete = (user, chatId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/chats/' + chatId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showChats = (user, chatId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chats/' + chatId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const chatUpdate = (user, chatId, updateChatData) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/chats/' + chatId,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: updateChatData
  })
}
