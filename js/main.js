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
