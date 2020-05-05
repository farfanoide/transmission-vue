import TransmissionClient from '../../services/transmission_client'

export function servers (state)
{
  return state.servers
}

export function currentServer (state)
{
  return state.currentServer
}

export function defaultServer (state)
{
  return state.servers.find(server => server.isDefault)
}

export function hasDefaultServer (state)
{
  return state.servers.some(server => server.isDefault)
}

export function client (state)
{
  return new TransmissionClient(state.currentServer)
}
