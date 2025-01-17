'use strict'

const YOUTUBE_API_KEY = 'AIzaSyB7k-8yQnVc6FQdhX6QsAAKojAfoxlI6NU'

function getYouTubeVideos() {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=the beatles`
  )
}

function getTopFiveSearch(value = 'the beatles') {
  console.log('value of get top five: ', value)
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

function getTopThreeWikiSearch(value = 'the beatles') {
  return axios
    .get(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${value}&format=json`
    )
    .then((res) => {
      const data = res.data.query.search.splice(0, 3)

      const cleanData = data.map((item) => {
        const { title, snippet } = item
        return { title, snippet, titleURL: title.split(' ').join('_') }
      })
      return Promise.resolve(cleanData)

      // let title = data[0].title.split(' ').join('_')
      // console.log('title', title)
    })
}
