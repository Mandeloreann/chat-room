import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = (chat, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/chats',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { chat }
  })
}

export const chatIndex = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chats',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const chatDelete = (user, chatId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/chats/' + chatId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showChats = (user, chatId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chats/' + chatId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const chatUpdate = (user, chat, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/chats/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { chat: chat }
  })
}
