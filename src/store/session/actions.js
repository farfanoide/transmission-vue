export function toggleSpeedSetting ({ rootGetters, state, commit })
{
  let sessionParams = {'alt-speed-enabled': !state.data['alt-speed-enabled']}

  rootGetters['configs/client'].session(sessionParams)
    .then((resp) => commit('UPDATE_SESSION_DATA', sessionParams))
}
