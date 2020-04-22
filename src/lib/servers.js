// TODO: change to Models
export function defaultServerTemplate()
{
  // TODO: add a Server class for all this logic and maybe more. we could also
  // serialize and deserialize server objects from localstorage
  return {
    displayName: null,
    host: 'localhost',
    url: '/transmission/rpc',
    ssl: false,
    port: 9091,
    username: '',
    password: '',
    connection: 'unknown',
    isNew: true,
  }
}

export function emptyServerTemplate()
{
  return {
    displayName: null,
    host: '',
    url: '',
    ssl: null,
    port: 0,
    username: '',
    password: '',
    connection: '',
    isNew: null,
  }
}

