const summarizer = (summary) => {
  if (summary) {
    if (summary.length > 1000) {
      var bio = summary.split('. ')
      bio.pop();
      return summarizer(bio.join('. '));
    } else {
      var bio = summary.split('. ')
      bio.pop();
      return bio.join('. ')
    }
  } else {
    return summary
  }
}


module.exports.summarizer = summarizer
