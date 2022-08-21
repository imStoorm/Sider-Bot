module.exports = function formatTime(time, format='dd:hh:mm:ss') {
    const formats = { dd:'days', hh:'hours', mm:'minutes', ss:'seconds' }
    
    const newFormat = format
      .replace(/dd|hh|mm|ss/g, match => time[formats[match]].toString().padStart(2, '0'))
      .replace(/^(00:)+/g, '')
  
    return newFormat.length > 2 ? newFormat : '00:'+newFormat
  }