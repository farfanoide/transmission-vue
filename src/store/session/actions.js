export function toggleSpeedSetting ({ rootGetters, state, commit })
{
  let sessionParams = {'alt-speed-enabled': !state.data['alt-speed-enabled']}

  rootGetters['configs/client'].session(sessionParams)
    .then((resp) => commit('UPDATE_SESSION_DATA', sessionParams))
}

export function verifyLocalData ( {rootGetters, getters } )
{
  /**
   * Set marked torrents to Verify Local Data
   **/
  rootGetters['configs/client'].verify(getters.selectedTorrentsIds)
}

// TODO: after calling the api, need to update active torrents
export function startTorrentsNow ( {rootGetters, getters } )
{
  /**
   * Start marked torrents inmediately calling transmission rpc
   * thru torrent service wrapper.
   * Bypasses the download queue says the docs.
   */
  rootGetters['configs/client'].startNow(getters.selectedTorrentsIds)
    .then(console.log)
    .catch(console.log)
}

export function startTorrents( {rootGetters, getters} )
{
  /**
   * Start marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  rootGetters['configs/client'].start(getters.selectedTorrentsIds)
    .then(console.log)
    .catch(console.log)
}

export function stopTorrents ( {rootGetters, getters} )
{
  /**
   * Stop marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  rootGetters['configs/client'].stop(getters.selectedTorrentsIds)
    .then(console.log)
    .catch(console.log)
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
      },
      // error :(
      error => console.log(error)
    )
}

