export function toggleSpeedSetting ({ rootGetters, state, commit })
{
  let sessionParams = {'alt-speed-enabled': !state.data['alt-speed-enabled']}

  rootGetters['configs/client'].session(sessionParams)
    .then((resp) => commit('UPDATE_SESSION_DATA', sessionParams))
}

export function startTorrents( {rootGetters, commit }, torrentIds )
{
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

// TODO: add remove actions
