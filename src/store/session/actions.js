//TODO: major problem found here, logic that belongs on the TransmissionService
//is currently on the store.
// The store should invoke the service instead, for this the service should be
// probably stored on vuex itself.

export function toggleSpeedSetting ({ rootGetters, state, commit })
{
  let sessionParams = {'alt-speed-enabled': !state.data['alt-speed-enabled']}

  rootGetters['configs/client'].session(sessionParams)
    .then((resp) => commit('UPDATE_SESSION_DATA', sessionParams))
}

export function verifyLocalData ( {rootGetters, getters, commit} )
{
  /**
   * Set marked torrents to Verify Local Data
   **/
  commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds)
  rootGetters['configs/client'].verify(getters.selectedTorrentsIds)
}

export function reannounceSelectedTorrents ( {rootGetters, getters, commit} )
{
  /**
   * Reannounce selected torrents
   **/
  commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds)
  rootGetters['configs/client'].reannounce(getters.selectedTorrentsIds)
}

// TODO: after calling the api, need to update active torrents
export function startTorrentsNow ( {rootGetters, getters, commit} )
{
  /**
   * Start marked torrents inmediately calling transmission rpc
   * thru torrent service wrapper.
   * Bypasses the download queue says the docs.
   */
  commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds)
  rootGetters['configs/client'].startNow(getters.selectedTorrentsIds)
}

export function startTorrents( {rootGetters, getters, commit} )
{
  /**
   * Start marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds)
  return rootGetters['configs/client'].start(getters.selectedTorrentsIds)
}

export function stopTorrents ( {rootGetters, getters, commit} )
{
  /**
   * Stop marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  commit('ADD_ACTIVE_TORRENTS_IDS', getters.selectedTorrentsIds)
  rootGetters['configs/client'].stop(getters.selectedTorrentsIds)
}

export function deleteTorrents( {rootGetters, getters, commit}, payload){
  /**
   * Perform a torrent deletion calling transmission rpc thru torrent
   * service wrapper.
   * @param payload A js plain object consisting of :
   *                * deleteFiles : boolean => Wether to delete or not
   *                  torrent associated files(the downloads)
   */
  rootGetters['configs/client']
    .remove(getters.selectedTorrentsIds, payload.deleteFiles)
    .then(
      //success!
      resp => {
        // reset selected torrents
        commit('CLEAR_SELECTED_TORRENTS');
        // Update session torrents with undeleted ones
        const remainingTorrents = getters.torrents
          .filter( torrent => !payload.torrentIds.includes(torrent.id))
        commit('SET_SESSION_TORRENTS', remainingTorrents)
        // TODO: maybe change this to a DELETE_TORRENT mutation, so the store
        // is the only one that actually handles info within it
      },
    )
}
