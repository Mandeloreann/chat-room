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

export const channelDelete = (data, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/channelCreator/:id',
    // url: apiUrl + '/channelCreator/' + data.channels._id
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data._id
  })
}
