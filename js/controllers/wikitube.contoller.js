'use strict'

function onInit() {
  renderVideoList()
  // renderYouTubes(getYouTubes())
}

function onSearchInput(value) {
  getTopFiveSearch(value)
    .then(renderYouTubeSearches)
    .catch((err) => console.log('error: ', err))
  getTopThreeWikiSearch(value)
    .then(renderWikiSearches)
    .catch((err) => console.log('error: ', err))
}

function renderWikis() {}

function renderVideoList() {
  getTopFiveSearch('the beatles')
    .then((res) => {
      //do the actual rendering
      const elVideoLayout = document.querySelector('.layout')
      let strHTML = ''

      strHTML = res
        .map((video) => {
          console.log('vidoeID: ', video.videoId)
          return `<div  onclick="onPlayVideo('${video.videoId}')" class="video-clip">
            <img src="${video.url}">     
         <p>${video.title}</p>
              
              </div>
            `
        })
        .join('')

      elVideoLayout.innerHTML = strHTML
      console.log('your video list sirs: ', res)
    })
    .catch((err) => console.log('error:  ', err))
}

function loadVideo(tag) {
  //load player with this video tag
}
