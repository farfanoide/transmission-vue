// TODO: add tests and handle edge cases
import FileTypeIcon from './filetype_icons'

function keyTreeItoUsableTree(name, node)
{
  if (node.isLeaf)
  {
    node.label = name
    node.icon = FileTypeIcon(name)
    return node
  }

  return {
    label: name,
    index: `${node.index}-${name}`, // bogus index for folders
    children: Object.keys(node).map(name => keyTreeItoUsableTree(name, node[name]))
  }
}

export default function FilesTree (files)
{
  let tree = {}
  let index = 0
  let leaf

  for (const file of files)
  {
    let nodePath = file.name.split('/')

    nodePath.reduce((nodeTree, path) => {
      if (!nodeTree[path]) { leaf = nodeTree[path] = {} }
      return nodeTree[path]
    }, tree)

    // Add file info to  leaf node
    leaf.isLeaf = true
    leaf.index = index
    leaf.length = file.length
    leaf.bytesCompleted = file.bytesCompleted
    index++
  }

  return keyTreeItoUsableTree('root', tree)['children']
}
