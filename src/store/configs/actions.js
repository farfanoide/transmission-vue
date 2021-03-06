// no need to use actions since we're using localstorage but just in case we
// need to change this in the future everything is already set up
// TODO: return promises from all actions

export function setServers ({ commit }, servers)
{
  commit('SET_SERVERS', servers)
}

export function addServer ({ commit }, server)
{
  commit('ADD_SERVER', server)
}

export function updateServer ({ commit }, server)
{
  commit('UPDATE_SERVER', server)
}

export function setCurrentServer ({ commit }, server)
{
  commit('SET_CURRENT_SERVER', server)
}

export function setDefaultServerAsCurrent ({ commit, getters })
{
  commit('SET_CURRENT_SERVER', getters.defaultServer)
}

export function deleteServer ({ commit }, server)
{
  commit('DELETE_SERVER', server)
}

export function toggleDefaultServer ({ commit }, server)
{
  commit('TOGGLE_DEFAULT_SERVER', server)
}
