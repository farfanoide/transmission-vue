
const FileTypeIcon = function (name)
{
  return FileTypeIcon.index.find(config => config.re.test(name)).icon
};

const REFERENCE = {
  archive: {
    icon: 'fas fa-file-archive',
    extensions: [
      '7z',
      'arj',
      'bz',
      'bz2',
      'cbr',
      'deb',
      'gz',
      'gzip',
      'pkg',
      'rar',
      'rpm',
      'tar',
      'tar.gz',
      'z',
      'zip',
    ]
  },
  diskImage: {
    icon: 'fas fa-compact-disc',
    extensions: [
      'bin',
      'dmg',
      'img',
      'iso',
      'toast',
      'vcd',
    ]
  },
  video: {
    icon: 'movie',
    extensions: [
      '3g2',
      '3gp',
      'avi',
      'flv',
      'h264',
      'm4v',
      'mkv',
      'mov',
      'mp4',
      'mpeg',
      'mpg',
      'rm',
      'swf',
      'vob',
      'webm',
      'wmv',
    ]
  },
  image: {
    icon: 'image',
    extensions: [
      'ai',
      'bmp',
      'gif',
      'icns',
      'ico',
      'jpeg',
      'jpg',
      'png',
      'ps',
      'psd',
      'svg',
      'tif',
      'tiff',
    ]
  },
  playlist: {
    icon: 'playlist_play',
    extensions: [
      'aimppl',
      'asx',
      'fpl',
      'kpl',
      'm3u',
      'm3u8',
      'mpcpl',
      'pla',
      'pls',
      'smil',
      'vlc',
      'wpl',
      'xspf',
      'zpl',
    ]
  },
  audio: {
    icon: 'fas fa-file-audio',
    extensions: [
      'aif',
      'cda',
      'flac',
      'mid',
      'midi',
      'mp3',
      'mpa',
      'ogg',
      'wav',
      'wave',
      'wma',
      'wpl',
    ]
  },
  csv: {
    icon: 'fas fa-file-csv',
    extensions: ['csv'],
  },
  pdf: {
    icon: 'fas fa-file-pdf',
    extensions: ['pdf']
  },
  presentation: {
    icon: 'fas fa-file-powerpoint',
    extensions: [
      'key',
      'odp',
      'pps',
      'ppt',
      'pptx',
    ]
  },
  word: {
    icon: 'fas fa-file-word',
    extensions: [
      'doc',
      'docx',
      'odt',
      'rtf',
      'tex',
      'txt',
      'wpd',
      'pages',
    ]
  },
  spreadsheet: {
    icon: 'fas fa-file-excel',
    extensions: [
      'ods',
      'xls',
      'xlsm',
      'xlsx',
      'numbers',
    ]
  },
  code: {
    icon: 'fas fa-file-code',
    extensions: [
      'c',
      'class',
      'cpp',
      'cs',
      'css',
      'dat',
      'db',
      'dbf',
      'h',
      'html',
      'java',
      'js',
      'log',
      'mdb',
      'pl',
      'r',
      'sav',
      'sh',
      'sql',
      'swift',
      'ts',
      'vb',
      'vbs',
      'xml',
    ]
  },
  email: {
    icon: 'fas fa-envelope',
    extensions: [
      'email',
      'eml',
      'emlx',
      'msg',
      'oft',
      'ost',
      'pst',
      'vcf',
    ]
  },
  fallback: {
    icon: 'fas fa-file-alt',
    extensions: []
  }
}

FileTypeIcon.index = Object.keys(REFERENCE).map(type => {
  return {
    re: new RegExp(`\.(${REFERENCE[type].extensions.join('|')})$`),
    icon: REFERENCE[type].icon
  }
})

export default FileTypeIcon
