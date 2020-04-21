export function defaultServerTemplate()
{
  // TODO: add a Server class for all this logic and maybe more. we could also
  // serialize and deserialize server objects from localstorage
  return {
    displayName: null,
    ipAddress: 'localhost',
    rpcEndpoint: '/transmission/rpc',
    ssl: false,
    port: 9091,
    username: '',
    password: '',
    connection: 'unknown',
    isNew: true,
    editing: true,
  }
}

export function emptyServerTemplate()
{
  return {
    displayName: null,
    ipAddress: '',
    rpcEndpoint: '',
    ssl: null,
    port: 0,
    username: '',
    password: '',
    connection: '',
    isNew: null,
    editing: null,
  }
}

