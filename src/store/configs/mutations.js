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

export function TOGGLE_DEFAULT_SERVER (state, server)
{
  let setDefault = !server.isDefault
  for (let s of state.servers)
  {
    // toggle specific server to iether default or not, regardles of other
    // servers
    s.isDefault = (s.id == server.id) ?
      setDefault :
      ((setDefault) ? false : s.isDefault)
    // other servers must only be changed if a new default is set
  }
}

export function SET_CLIENT (state, client)
{
  state.client = client
}

export function CLEAR_CLIENT (state)
{
  state.client = null
}

export function ADD_TRACKER_IMAGE (state, {tracker, imageUrl})
{
  state.trackerImages[tracker] = imageUrl
}

// TODO: maybe add cache expiration for favicon images or catch 404s to try and
// fetch them again.
export function CLEAR_TRACKER_IMAGES (state)
{
  state.trackerImages = {}
}
