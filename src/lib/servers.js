// TODO: change to Models
export function defaultServerTemplate()
{
  // TODO: add a Server class for all this logic and maybe more. we could also
  // serialize and deserialize server objects from localstorage
  return {
    isDefault: false,
    displayName: null,
    host: 'localhost',
    url: '/transmission/rpc',
    ssl: false,
    port: 9091,
    username: '',
    password: '',
    connection: 'unknown',
  }
}
