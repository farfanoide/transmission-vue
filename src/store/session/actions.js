export function toggleSpeedSetting ({ rootGetters, state, commit })
{
  let sessionParams = {'alt-speed-enabled': !state.data['alt-speed-enabled']}

  rootGetters['configs/client'].session(sessionParams)
    .then((resp) => commit('UPDATE_SESSION_DATA', sessionParams))
}

// TODO: after calling the api, need to update active torrents
export function startTorrentsNow ( {rootGetters, commit }, torrentIds )
{
  rootGetters['configs/client'].startNow(torrentIds)
    .then(console.log)
    .catch(console.log)
}

export function startTorrents( {rootGetters, commit }, torrentIds )
{
  console.log("startTorrents")
  rootGetters['configs/client'].start(torrentIds)
    .then(console.log)
    .catch(console.log)
}

export function stopTorrents ( {rootGetters, commit}, torrentIds )
{
  rootGetters['configs/client'].stop(torrentIds)
    .then(console.log)
    .catch(console.log)
}

export function deleteTorrents( {rootGetters, getters, commit}, payload){
  /**
   * Perform a torrent deletion calling transmission rpc thru torrent
   * service wrapper.
   * @param payload A js plain object consisting of :
   *                * torrentIds : Array<number> => Ids of the torrents
   *                  to be deleted
   *                * deleteFiles : boolean => Wether to delete or not
   *                  torrent associated files(the downloads)
   */
  rootGetters['configs/client'].remove(payload.torrentIds, payload.deleteFiles)
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

