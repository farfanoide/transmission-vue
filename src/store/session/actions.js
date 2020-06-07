// TODO: unify those two?
import specV15 from '../../lib/rpc_spec/v15';
import RPCReference from '../../lib/rpc'

export function toggleSpeedSetting ({ rootGetters, state, commit })
{
  let sessionParams = {'alt-speed-enabled': !state.data['alt-speed-enabled']}

  return rootGetters['configs/client'].session(sessionParams)
    .then((resp) => commit('UPDATE_SESSION_DATA', sessionParams))
}

export function verifyTorrents ( {rootGetters, commit }, torrentsIds)
{
  return rootGetters['configs/client'].verify(torrentsIds)
}

export function verifySelectedTorrents (context)
{
  /**
   * Set marked torrents to Verify Local Data
   **/
  return verifyTorrents(context, context.state.selectedTorrentsIds)
}

export function reannounceTorrents ({rootGetters, commit}, torrentsIds)
{
  /**
   * Reannounce torrents
   **/
  return rootGetters['configs/client'].reannounce(torrentsIds)
}

export function reannounceSelectedTorrents (context)
{
  /**
   * Reannounce selected torrents
   **/
  return reannounceTorrents(context, context.state.selectedTorrentsIds)
}

export function startTorrentsNow ({rootGetters, commit}, torrentsIds)
{
  /**
   * Start marked torrents inmediately calling transmission rpc
   * thru torrent service wrapper.
   * Bypasses the download queue says the docs.
   */
  return rootGetters['configs/client'].startNow(torrentsIds)
}

export function startSelectedTorrentsNow (context)
{
  /**
   * Start marked torrents inmediately calling transmission rpc
   * thru torrent service wrapper.
   * Bypasses the download queue says the docs.
   */
  return startTorrentsNow(context, context.state.selectedTorrentsIds)
}

export function startTorrents({rootGetters, commit}, torrentsIds)
{
  /**
   * Start marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  return rootGetters['configs/client'].start(torrentsIds)
}

export function startSelectedTorrents(context)
{
  /**
   * Start marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  return startTorrents(context, context.state.selectedTorrentsIds)
}

export function stopTorrents ({rootGetters, commit}, torrentsIds)
{
  /**
   * Stop marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  return rootGetters['configs/client'].stop(torrentsIds)
}

export function stopSelectedTorrents (context)
{
  /**
   * Stop marked torrents calling transmission rpc thru torrent
   * service wrapper.
   */
  return stopTorrents(context, context.state.selectedTorrentsIds)
}


export function deleteTorrents({ rootGetters, commit }, payload)
{
  /**
   * Perform a torrent deletion calling transmission rpc thru torrent
   * service wrapper.
   * @param payload A js plain object consisting of :
   *                * torrentsIds : array => IDS of the torrents to
   *                  delete
   *                * deleteFiles : boolean => Wether to delete or not
   *                  torrent associated files(the downloads)
   */
  return rootGetters['configs/client']
    .remove(payload.torrentIds, payload.deleteFiles)
    .then(
      //success!
      resp => {
        // Update session torrents with undeleted ones
        commit('DELETE_TORRENTS', payload.torrentIds)
        // reset selected torrents
        commit('CLEAR_SELECTED_TORRENTS');
      },
    )
}

export function deleteSelectedTorrents(context, { deleteFiles })
{
  /**
   * Perform a torrent deletion calling transmission rpc thru torrent
   * service wrapper.
   * @param payload A js plain object consisting of :
   *                * deleteFiles : boolean => Wether to delete or not
   *                  torrent associated files(the downloads)
   */
  return deleteTorrents(context, {
    torrentIds:  context.state.selectedTorrentsIds,
    deleteFiles: deleteFiles
  })
}


export function getSessionData({ rootGetters, state, getters, commit })
{
  // if session.data already exists dont go to the
  // client. one request less _:)
  return !Object.keys(state.data).length?
    rootGetters['configs/client'].session()
    .then(response => {
      commit('SET_SESSION_DATA', response);
      return response;
    })
    :
    state.data;
}

export function getSessionStats({ rootGetters, getters, commit })
{
  return rootGetters['configs/client'].sessionStats()
    .then(stats => commit('SET_SESSION_STATS', stats))
}


export function getTorrents({ rootGetters, commit }, payload = {ids: undefined, fields: RPCReference.minimalFields()})
{
  return rootGetters['configs/client'].get(payload.ids, payload.fields)
    .then(torrents => commit('UPDATE_TORRENTS', torrents))
}

export function updateActiveTorrents({ rootGetters, getters, commit, state }, fields)
{
  return rootGetters['configs/client'].active(fields || RPCReference.minimalFields())
    .then(torrents => commit('UPDATE_TORRENTS', torrents))
}

// TODO: these queue dont really need the store, maybe they could be invoked
// directly on a client on the component itself?
export function queueMoveTop({ rootGetters }, ids)
{
  return rootGetters['configs/client'].queueMoveTop(ids)
}

export function queueMoveUp({ rootGetters }, ids)
{
  return rootGetters['configs/client'].queueMoveUp(ids)
}

export function updateSettings({commit}, settings)
/**
 *  Update settings on store. Uses mutator
 *  @param settings A plain js object with settings
 *                  to store.
 */
{
  commit('UPDATE_SESSION_DATA', settings);
}

export function updateClientSettings({rootGetters, state})
/**
 * Update settings in the transmission client
 * @todo: Dinamically use spec based on version setting
 */
{
  const setable = specV15.session.getSetableParams();
  let settings = Object.fromEntries(
    Object.entries(state.data).filter(([name,value]) => setable.includes(name))
  );
  return rootGetters['configs/client'].session(settings);
}

export function queueMoveDown({ rootGetters }, ids)
{
  return rootGetters['configs/client'].queueMoveDown(ids)
}

export function queueMoveBottom({ rootGetters }, ids)
{
  return rootGetters['configs/client'].queueMoveBottom(ids)
}
