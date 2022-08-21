module.exports = function progressBarEnhanced(current, total, barSize) {
    const progress = Math.round((barSize*current)/total)
  
    return '—'.repeat(progress > 0 ? progress-1 : progress) + '•' + '-'.repeat(barSize-progress)
  }
  