// TODO: add tests and handle edge cases

function keyTreeItoUsableTree(name, node)
{
  if (Object.keys(node).length === 0)
  {
    return { label: name }
  }

  return {
    label: name,
    children: Object.keys(node).map(name => keyTreeItoUsableTree(name, node[name]))
  }
}

export default function FilesTree (files)
{
  let tree = {}

  for (const file of files)
  {
    let nodePath = file.name.split('/')

    nodePath.reduce((nodeTree, path) => {
      if (!nodeTree[path]) { nodeTree[path] = {} }
      return nodeTree[path]
    }, tree)
  }

  return keyTreeItoUsableTree('root', tree)['children']
}
