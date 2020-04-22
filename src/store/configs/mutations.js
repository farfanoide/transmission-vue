export function SET_SERVERS (state, servers)
{
  state.servers = servers;
}

export function ADD_SERVER(state, server)
{
  state.servers.push(server)
}

export function UPDATE_SERVER(state, server)
{
  state.servers = state.servers.filter(s => s.id != server.id).concat([server])
}

export function DELETE_SERVER(state, server)
{
  state.servers = state.servers.filter(s => s.id != server.id)
}

export function SET_CURRENT_SERVER (state, server)
{
  state.currentServer = server
}

