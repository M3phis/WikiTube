'use strict'
let gSearches

function onInit() {
  // resizeVideoScreen()
  // getTopFiveSearch()
  //   .then(renderVideoList)
  //   .catch((err) => console.log('error: ', err))
  // getTopThreeWikiSearch()
  //   .then(renderWikis)
  //   .catch((err) => console.log('error: ', err))
  // renderVideoList()
  // renderWikis()
  // renderYouTubes(getYouTubes())

  gSearches = loadFromStorage('searches') || []
  console.log('gSearches :', gSearches)
  renderFooter(gSearches)
}

function onSearchInput(event) {
  event.preventDefault()

  const value = document.querySelector('.search-input').value
  console.log('value: ', value)
  getTopFiveSearch(value)
    .then(renderVideoList)
    .catch((err) => console.log('error: ', err))
  getTopThreeWikiSearch(value)
    .then(renderWikis)
    .catch((err) => console.log('error: ', err))
    .then(() => {
      const searches = loadFromStorage('searches') || []
      searches.push(value)
      saveToStorage('searches', searches)
    })
}

function renderWikis(wikis) {
  console.log('your wiki list sirs: ', wikis)

  const elWikiInfo = document.querySelector('.wiki-info')
  let strHTML = ''

  strHTML = wikis
    .map((article) => {
      return `<h2><a href="https://en.wikipedia.org/wiki/${article.titleURL}">
        ${article.title}</a></h2>
           <p>${article.snippet}</p>
          `
    })
    .join('')
  elWikiInfo.innerHTML = strHTML
}

function renderVideoList(videos) {
  console.log('render vidoe list: ', videos)

  //do the actual rendering
  const elVideoLayout = document.querySelector('.layout')
  let strHTML = ''

  strHTML = videos
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
}

function loadVideo(tag) {
  //load player with this video tag
}

function resizeVideoScreen() {
  const elContainer = document.querySelector('.main-container')
  const elVideoScreen = document.querySelector('.video-screen')
  // Changing the canvas dimension clears the canvas
  elVideoScreen.width = elContainer.clientWidth - 60
  elVideoScreen.style.height = (elContainer.clientWidth * 9) / 16 + 'px'
}

function renderFooter(searches) {
  const elHistory = document.querySelector('footer .history')
  let strHMTL = ''

  strHMTL = searches
    .map((search) => {
      return `<div>${search}</div>`
    })
    .join('')
  elHistory.innerHTML = strHMTL
  console.log('these are your seraches: ', searches)
}

function onDeleteHistory() {
  localStorage.clear()
  gSearches = []
  renderFooter(gSearches)
  console.log('deleting')
}
