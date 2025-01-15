'use strict'

const YOUTUBE_API_KEY = 'AIzaSyDzbz1rmh6TBRznbC9hajSu6OgrrC2VTTM'

function getYouTubeVideos() {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=the beatles`
  )
}

function getTopFiveSearch(value) {
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=${value}`
    )
    .then((res) => {
      const { items } = res.data
      console.log(items)

      const cleanResults = items.map((item) => {
        const { videoId } = item.id
        const { url } = item.snippet.thumbnails.default
        const { title } = item.snippet

        return { videoId, url, title }
      })
      //   console.log('clean results: ', cleanResults)
      return Promise.resolve(cleanResults)
    })
}

function getTopThreeWikiSearch(value) {}

////

/*
arr = [
 {id, thumbnail}
]



*/
