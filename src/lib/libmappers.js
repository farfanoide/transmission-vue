export function percent (val)
{
  return (val * 100).toFixed(2).substring(0, 3)
}

export function  date (seconds)
{
  return seconds > 0 ? new Date( 1000 * seconds ): "-";
}

export  function size (bytes)
{
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


