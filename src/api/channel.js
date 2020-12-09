import apiUrl from '../apiConfig'
import axios from 'axios'

export const createChannel = (channel, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/channelCreator',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { channel }
  })
}

export const channelIndex = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/channelCreator',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const channelDelete = (user, channelId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/channelCreator/' + channelId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const channelUpdate = (updateChannelData, channelId, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/chats/' + channelId,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { updateChannelData }
  })
}

export const showChannels = (user, channelId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chats/' + channelId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
