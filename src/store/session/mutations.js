import Vue from 'vue'
import Torrent from '../../models/torrent'

export function SET_SESSION_DATA (state, data)
{
  state.data = data;
}

export function UPDATE_SESSION_DATA (state, data)
{
  Object.assign(state.data, data)
}

export function SET_SESSION_STATS (state, stats)
{
  state.stats = stats;
}

export function CLEAR_SESSION_TORRENTS (state)
{
  /**
   * Clear sessions torrents, particularly useful when changing
   * from one server to the next so we dont show old data while
   * new torrent service is being enabled.
   **/
  state.torrents = {}
  // TODO: check if we should delete state.torrents before to avoid mem leaks
  // or too much GC dependency
}

// TODO: mark for deprecation and delete
export function SET_SESSION_TORRENTS (state, torrents)
{
  /**
   * Set all torrents returned by transmission rpc as a dictionary where each
   * key is a torrent id and points to that torrent. This makes updates much
   * easyer.
   */
  state.torrents = Object.fromEntries(torrents.map(torrent => [torrent.id, torrent]))
}

export function DELETE_TORRENTS (state, torrentIds)
{
/**
 * Removes given torrents from the store
 **/
  for (const torrentId of torrentIds)
  {
    delete state.torrents[torrentId]
  }
}

export function SET_ACTIVE_TORRENTS (state, torrents)
/**
 * Set current torrents that had some recent activity
 * i.e: has been seeded, has been downloaded, etc...
 */
{
  state.activeTorrentsIds = torrents.map(torrent => torrent.id);
}

export function ADD_ACTIVE_TORRENTS_IDS (state, torrentsIds)
{
  state.activeTorrentsIds = [...(new Set(state.activeTorrentsIds.concat(torrentsIds)))]
}

export function UPDATE_TORRENTS (state, torrents)
{
  for (const torrent of torrents)
  {
    (state.torrents[torrent.id])
      ? state.torrents[torrent.id].update(torrent)
      : Vue.set(state.torrents, torrent.id, new Torrent(torrent))
  }
}

export function TOGGLE_SELECED_TORRENT ({ selectedTorrentsIds }, torrentId)
{
  selectedTorrentsIds.includes(torrentId) ?
    selectedTorrentsIds.splice(selectedTorrentsIds.indexOf(torrentId), 1) :
    selectedTorrentsIds.push(torrentId)
}

export function CLEAR_SELECTED_TORRENTS (state)
{
  state.selectedTorrentsIds = []
}

export function CLEAR_FILTERS  (state)
{
  state.activeFilters = {
    nameFilter: '',
    statusFilter: 'ALL',
  }
}

export function UPDATE_STATUS_FILTER (state, statusFilter)
{
  state.activeFilters.statusFilter = statusFilter
}

export function UPDATE_NAME_FILTER (state, nameFilter)
{
  state.activeFilters.nameFilter = nameFilter
}

export function SET_SETTINGS (state, settings) {
  state.settings = settings;
}

export function UPDATE_SORT_BY (state, sort)
{
  state.sorting.sortBy = sort
}

export function UPDATE_SORT_REVERSED (state, reverse)
{
  state.sorting.reverse = reverse
}

export function SET_SELECTED_TORRENT_ID (state, id)
{
  state.selectedTorrentId = id
}
