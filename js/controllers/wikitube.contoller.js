'use strict'

function onInit() {
  renderVideoList()
  renderWikis()
  resizeVideoScreen()
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

function renderWikis() {
  getTopThreeWikiSearch('the beatles')
    .then((res) => {
      const elWikiInfo = document.querySelector('.wiki-info')
      let strHTML = ''

      strHTML = res
        .map((article) => {
          return `<h2><a href="https://en.wikipedia.org/wiki/${article.titleURL}">
        ${article.title}</a></h2>
           <p>${article.snippet}</p>
          `
        })
        .join('')

      elWikiInfo.innerHTML = strHTML
    })
    .catch((err) => console.log('err: ', err))
}

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

function resizeVideoScreen() {
  const elContainer = document.querySelector('.main-container')
  const elVideoScreen = document.querySelector('.video-screen')
  // Changing the canvas dimension clears the canvas
  elVideoScreen.width = elContainer.clientWidth - 1
  elVideoScreen.style.height = (elContainer.clientWidth * 9) / 16 + 'px'
}
