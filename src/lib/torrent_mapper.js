import * as libmappers from './libmappers'
import TransmissionFormatter from './formatter'

const MAPPERS = {
  'activityDate':            libmappers.date,
  'addedDate':               libmappers.date,
  // 'bandwidthPriority':       'Bandwidth Priority',
  // 'comment':                 'Comment',
  // 'corruptEver':             'Corrupt Ever',
  // 'creator':                 'Creator',
  'dateCreated':             libmappers.date,
  // 'desiredAvailable':        'Desired Available',
  'doneDate':                libmappers.date,
  // 'downloadDir':             'Download Dir',
  // 'downloadLimit':           'Download Limit',
  // 'downloadLimited':         'Download Limited',
  // 'downloadedEver':          'Downloaded Ever',
  // 'error':                   'Error',
  // 'errorString':             'Error String',
  // 'eta':                     'Eta',
  // 'fileStats':               'File Stats',
  // 'files':                   'Files',
  // 'hashString':              'Hash String',
  // 'haveUnchecked':           'Have Unchecked',
  // 'haveValid':               'Have Valid',
  // 'honorsSessionLimits':     'Honors Session Limits',
  // 'id':                      'Id',
  // 'isFinished':              'Is Finished',
  // 'isPrivate':               'Is Private',
  // 'leftUntilDone':           'Left Until Done',
  // 'magnetLink':              'Magnet Link',
  // 'manualAnnounceTime':      'Manual Announce Time',
  // 'maxConnectedPeers':       'Max Connected Peers',
  // 'metadataPercentComplete': libmappers.percent,
  // 'name':                    'Name',
  // 'peer-limit':              'Peer-limit',
  // 'peers':                   'Peers',
  // 'peersConnected':          'Peers Connected',
  // 'peersFrom':               'Peers From',
  // 'peersGettingFromUs':      'Peers Getting From Us',
  // 'peersSendingToUs':        'Peers Sending To Us',
  // 'percentDone':             libmappers.percent,
  // 'pieceCount':              'Piece Count',
  'pieceSize':               libmappers.size,
  // 'pieces':                  'Pieces',
  // 'priorities':              'Priorities',
  // 'rateDownload':            'Rate Download',
  // 'rateUpload':              'Rate Upload',
  // 'recheckProgress':         'Recheck Progress',
  // 'seedIdleLimit':           'Seed Idle Limit',
  // 'seedIdleMode':            'Seed Idle Mode',
  // 'seedRatioLimit':          'Seed Ratio Limit',
  // 'seedRatioMode':           'Seed Ratio Mode',
  // 'sizeWhenDone':            libmappers.size,
  'startDate':               libmappers.date,
  'status':                  libmappers.status,
  // 'torrentFile':             'Torrent File',
  // 'totalSize':               libmappers.size,
  // 'trackerStats':            'Tracker Stats',
  // 'trackers':                'Trackers',
  // 'uploadLimit':             'Upload Limit',
  // 'uploadLimited':           'Upload Limited',
  // 'uploadRatio':             'Upload Ratio',
  // 'uploadedEver':            'Uploaded Ever',
  // 'wanted':                  'Wanted',
  // 'webseeds':                'Webseeds',
  // 'webseedsSendingToUs':     'Webseeds Sending To Us',
}

class TorrentMapper {

  static attrsToMap()
  {
    return Object.keys(MAPPERS)
  }

  static hasMapperFor(prop)
  {
    return Boolean(MAPPERS[prop])
  }

  static mapperFor(prop)
  {
    return MAPPERS[prop]
  }

  static mapValue(prop, value)
  {
    return this.mapperFor(prop)(value)
  }
}

export default TorrentMapper
