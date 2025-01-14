'use strict'

const YOUTUBE_API_KEY = 'AIzaSyDzbz1rmh6TBRznbC9hajSu6OgrrC2VTTM'

function getYouTubeVideos() {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=the beatles`
  )
}

getYouTubeVideos()
  .then((res) => console.log(res))
  .catch((err) => console.log('error: ', err))

gVideos = {
  video1: { title: 'title', embedTag: 'tag', thumbnail: 'thumbnail_url' },
}

function onPlayVideo() {
  playVideo('tag')
}

function playVideo(tag) {
  console.log('playing video with this tag: ', tag)
  //play embeded youtube video clip
}

function onSearchInput(value) {
  getTopFiveSearch(value)
    .then(renderYouTubeSearches)
    .catch((err) => console.log('error: ', err))
  getTopThreeWikiSearch(value)
    .then(renderWikiSearches)
    .catch((err) => console.log('error: ', err))
}

function getTopFiveSearch(value) {}

function getTopThreeWikiSearch(value) {}
