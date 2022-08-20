const checkSimilarity = require('./checkSimilarity')
module.exports = function didYouMean(str, array, threshold=60) {
    return array
      .map(e => { return {e, v: checkSimilarity(str, e)} }) // checkSimilarity function can be found in this repository
      .filter(({v}) => v >= threshold/100)
      .reduce((_, curr, i, arr) => arr[i].v > curr ? arr[i].v : curr.e, null)
  }