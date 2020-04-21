// no need to use actions since we're using localstorage but just in case we
// need to change this in the future everything is already set up

import { LocalStorage } from 'quasar'


export function initialize({ commit })
{
  let servers = getServers({commit})
  commit('SET_SERVERS', servers)
}

export function getServers ({ commit })
{
  return LocalStorage.has('servers') ? LocalStorage.getItem('servers') : []
}

export function setServers ({ commit }, servers) {
  LocalStorage.set('servers', servers)
  commit('SET_SERVERS', servers)
}

export function addServer ({ commit, state }, server)
{
  // let allServers = state.servers.concat([server])
  setServers({commit, state}, state.servers.concat([server]))
  // LocalStorage.set('servers', allServers)
  // commit('SET_SERVERS', allServers)
}

export function updateServer ({ commit, state }, server)
{
  let allServers = state.servers.concat([server])
  LocalStorage.set('servers', allServers)
  commit('SET_SERVERS', allServers)
}

export function setCurrentServer ({ commit, state }, server)
{
  LocalStorage.set('currentServer', server)
  commit('SET_CURRENT_SERVER', server)
}

export function deleteServer ({ commit, state }, server)
{
  let allServers = state.servers.filter(s => s != server)
  setServers({commit}, allServers)
}
