'use strict'
let gSearches
let elDeletBtn

function onInit() {
  elDeletBtn = document.querySelector('.delete-btn')
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
  toggleDeleteBtn()

  console.log('gSearches :', gSearches)
  renderFooter(gSearches)
}

function onSearchInput(value) {
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
      renderFooter(searches)
      gSearches = searches
      console.log('gSearches', gSearches)
      toggleDeleteBtn()
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

function onDeleteHistory(ev) {
  // ev.preventDefault()
  Swal.fire({
    title: 'Do you want to delete your history?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Don't Delete`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Delete!', '', 'success')
      localStorage.clear()
      gSearches = []
      renderFooter(gSearches)
      toggleDeleteBtn()
      console.log('deleting')
    } else if (result.isDenied) {
      Swal.fire('History did not deleted', '', 'info')
    }
  })
}

function toggleDeleteBtn() {
  if (!gSearches[0]) {
    elDeletBtn.classList.add('hidden')
  } else {
    elDeletBtn.classList.remove('hidden')
  }
}

function onChangeColor() {
  Swal.fire({
    title: 'Pick a Background Color',
    html: `
        <input type="color" id="bgColorPicker" value="#ffffff" style="width: 100%; height: 50px; border: none; cursor: pointer;">
    `,
    showCancelButton: true,
    confirmButtonText: 'Apply',
    preConfirm: () => {
      return document.getElementById('bgColorPicker').value
    },
  }).then((result) => {
    if (result.isConfirmed) {
      document.body.style.background = result.value
    }
  })
}
