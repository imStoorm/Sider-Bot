module.exports = function checkSimilarity(str1, str2) {
    if (str1 === str2) return 1.0
  
    const len1 = str1.length
    const len2 = str2.length
  
    const maxDist = ~~(Math.max(len1, len2)/2)-1
    let matches = 0
  
    const hash1 = []
    const hash2 = []
  
    for(var i=0; i<len1; i++)
      for(var j=Math.max(0, i-maxDist); j<Math.min(len2, i+maxDist+1); j++)
        if (str1.charAt(i) === str2.charAt(j) && !hash2[j]) {
          hash1[i]=1
          hash2[j]=1
          matches++
          break
        }
  
    if (!matches) return 0.0
  
    let t = 0
    let point = 0
  
    for(var k=0; k<len1; k++)
      if (hash1[k]) {
        while(!hash2[point])
          point++
  
        if (str1.charAt(k) !== str2.charAt(point++))
          t++
      }
  
    t/=2
  
    return ( (matches/len1) + (matches/len2) + ((matches-t)/matches) )/3.0
  }