export function toggleSpeedSetting ({ rootGetters, state, commit })
{
  let sessionParams = {'alt-speed-enabled': !state.data['alt-speed-enabled']}

  return rootGetters['configs/client'].session(sessionParams)
    .then((resp) => commit('UPDATE_SESSION_DATA', sessionParams))
}

export function verifyLocalData ( {rootGetters, getters, commit} )
{
  /**
   * Set marked torrents to Verify Local Data
   **/
  return rootGetters['configs/client'].verify(getters.selectedTorrentsIds)
    .then(() => commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds))
}

export function reannounceSelectedTorrents ( {rootGetters, getters, commit} )
{
  /**
   * Reannounce selected torrents
   **/
  return rootGetters['configs/client'].reannounce(getters.selectedTorrentsIds)
    .then(() => commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds))
}

// TODO: after calling the api, need to update active torrents
export function startTorrentsNow ( {rootGetters, getters, commit} )
{
  /**
   * Start marked torrents inmediately calling transmission rpc
   * thru torrent service wrapper.
   * Bypasses the download queue says the docs.
   */
  return rootGetters['configs/client'].startNow(getters.selectedTorrentsIds)
    .then(() => commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds))
}

export function startTorrents( {rootGetters, getters, commit} )
{
  /**
   * Start marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  return rootGetters['configs/client'].start(getters.selectedTorrentsIds)
    .then(() => commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds))
}

export function stopTorrents ( {rootGetters, getters, commit} )
{
  /**
   * Stop marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  return rootGetters['configs/client'].stop(getters.selectedTorrentsIds)
    .then(() => commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds))
}

export function deleteTorrents( {rootGetters, getters, commit}, payload){
  /**
   * Perform a torrent deletion calling transmission rpc thru torrent
   * service wrapper.
   * @param payload A js plain object consisting of :
   *                * deleteFiles : boolean => Wether to delete or not
   *                  torrent associated files(the downloads)
   */
  return rootGetters['configs/client']
    .remove(getters.selectedTorrentsIds, payload.deleteFiles)
    .then(
      //success!
      resp => {
        // Update session torrents with undeleted ones
        commit('DELETE_TORRENTS', getters.selectedTorrentsIds)
        // reset selected torrents
        commit('CLEAR_SELECTED_TORRENTS');
      },
    )
}


export function getSessionData({ rootGetters, state, getters, commit })
{
  return rootGetters['configs/client'].session()
    .then(data => commit('SET_SESSION_DATA', data))
}

export function getSessionStats({ rootGetters, getters, commit })
{
  return rootGetters['configs/client'].sessionStats()
    .then(stats => commit('SET_SESSION_STATS', stats))
}


export function getTorrents({ rootGetters, getters, commit })
{
  return rootGetters['configs/client'].get()
    .then(torrents => commit('SET_SESSION_TORRENTS', torrents))
}

export function updateActiveTorrentsIds({ rootGetters, getters, commit })
{
  return rootGetters['configs/client'].active()
    .then(torrents => commit('ADD_ACTIVE_TORRENTS_IDS', torrents.map(torrent => torrent.id)))
}

export function updateActiveTorrents({ rootGetters, getters, commit, state })
{
  return rootGetters['configs/client'].get(state.activeTorrentsIds)
    .then(torrents => commit('UPDATE_TORRENTS', torrents))
}
