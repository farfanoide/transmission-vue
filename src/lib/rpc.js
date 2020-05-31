const TorrentColumnsReference = {
  'activityDate':            'Activity Date',
  'addedDate':               'Added Date',
  'bandwidthPriority':       'Bandwidth Priority',
  'comment':                 'Comment',
  'corruptEver':             'Corrupt Ever',
  'creator':                 'Creator',
  'dateCreated':             'Date Created',
  'desiredAvailable':        'Desired Available',
  'doneDate':                'Done Date',
  'downloadDir':             'Download Dir',
  'downloadLimit':           'Download Limit',
  'downloadLimited':         'Download Limited',
  'downloadedEver':          'Downloaded Ever',
  'error':                   'Error',
  'errorString':             'Error String',
  'eta':                     'Eta',
  'fileStats':               'File Stats',
  'files':                   'Files',
  'hashString':              'Hash String',
  'haveUnchecked':           'Have Unchecked',
  'haveValid':               'Have Valid',
  'honorsSessionLimits':     'Honors Session Limits',
  'id':                      'Id',
  'isFinished':              'Is Finished',
  'isPrivate':               'Is Private',
  'leftUntilDone':           'Left Until Done',
  'magnetLink':              'Magnet Link',
  'manualAnnounceTime':      'Manual Announce Time',
  'maxConnectedPeers':       'Max Connected Peers',
  'metadataPercentComplete': 'Metadata Percent Complete',
  'name':                    'Name',
  'peer-limit':              'Peer-limit',
  'peers':                   'Peers',
  'peersConnected':          'Peers Connected',
  'peersFrom':               'Peers From',
  'peersGettingFromUs':      'Peers Getting From Us',
  'peersSendingToUs':        'Peers Sending To Us',
  'percentDone':             'Percent Done',
  'pieceCount':              'Piece Count',
  'pieceSize':               'Piece Size',
  'pieces':                  'Pieces',
  'priorities':              'Priorities',
  'rateDownload':            'Rate Download',
  'rateUpload':              'Rate Upload',
  'recheckProgress':         'Recheck Progress',
  'seedIdleLimit':           'Seed Idle Limit',
  'seedIdleMode':            'Seed Idle Mode',
  'seedRatioLimit':          'Seed Ratio Limit',
  'seedRatioMode':           'Seed Ratio Mode',
  'sizeWhenDone':            'Size When Done',
  'startDate':               'Start Date',
  'status':                  'Status',
  'torrentFile':             'Torrent File',
  'totalSize':               'Total Size',
  'trackerStats':            'Tracker Stats',
  'trackers':                'Trackers',
  'uploadLimit':             'Upload Limit',
  'uploadLimited':           'Upload Limited',
  'uploadRatio':             'Upload Ratio',
  'uploadedEver':            'Uploaded Ever',
  'wanted':                  'Wanted',
  'webseeds':                'Webseeds',
  'webseedsSendingToUs':     'Webseeds Sending To Us',
}

const StatusReference = {

  // local representation of possible statuses
  STOPPED:       'STOPPED',         // Torrent is stopped
  CHECK_WAIT:    'CHECK_WAIT',      // Queued to check files
  CHECK:         'CHECK',           // Checking files
  DOWNLOAD_WAIT: 'DOWNLOAD_WAIT',   // Queued to download
  DOWNLOAD:      'DOWNLOAD',        // Downloading
  SEED_WAIT:     'SEED_WAIT',       // Queued to seed
  SEED:          'SEED',            // Seeding
  ISOLATED:      'ISOLATED',        // Torrent can't find peers

}

StatusReference.fromRpc = {
  // mapping of RPC status codes to local representation
  0: StatusReference.STOPPED,         // Torrent is stopped
  1: StatusReference.CHECK_WAIT,      // Queued to check files
  2: StatusReference.CHECK,           // Checking files
  3: StatusReference.DOWNLOAD_WAIT,   // Queued to download
  4: StatusReference.DOWNLOAD,        // Downloading
  5: StatusReference.SEED_WAIT,       // Queued to seed
  6: StatusReference.SEED,            // Seeding
  7: StatusReference.ISOLATED,        // Torrent cant find peers
}

StatusReference.names = {
  // Display Representation of torrent statuses
  STOPPED:       'Paused',
  CHECK_WAIT:    'Queued for verification',
  CHECK:         'Verifying local data',
  DOWNLOAD_WAIT: 'Queued for download',
  DOWNLOAD:      'Downloading',
  SEED_WAIT:     'Queued for seeding',
  SEED:          'Seeding',
  ISOLATED:      'Isolated',
}

// TODO: maybe move torrent_mapper.MAPPERS reference here and have
// a SSOT for all RPC related data
class RPCReference {

  static availableFields()
  {
    return Object.keys(this.fields)
  }

  static minimalFields()
  {
    return [
      "downloadDir",
      "error",
      "errorString",
      "eta",
      "id",
      "isFinished",
      "isStalled",
      "leftUntilDone",
      "metadataPercentComplete",
      "name",
      "peersConnected",
      "peersGettingFromUs",
      "peersSendingToUs",
      "percentDone",
      "queuePosition",
      "rateDownload",
      "rateUpload",
      "recheckProgress",
      "seedRatioLimit",
      "seedRatioMode",
      "sizeWhenDone",
      "status",
      "trackers",
      "uploadRatio",
      "uploadedEver",
      "webseedsSendingToUs",
    ]
  }

  static columnName(column)
  {
    return this.fields[column] || column
  }

  static statusSlug(statusId)
  {
    return this.status.fromRpc[statusId] || 'Unknown'
  }

  static statusName(statusSlug)
  {
    return this.status.names[statusSlug]
  }

}

RPCReference.status = StatusReference;
RPCReference.fields = TorrentColumnsReference;

export default RPCReference
