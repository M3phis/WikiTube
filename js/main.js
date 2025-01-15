'use strict'

// getYouTubeVideos()
//   .then((res) => console.log(res))
//   .catch((err) => console.log('error: ', err))

function onPlayVideo(tag) {
  playVideo(tag)
}

function playVideo(tag) {
  console.log('playing video with this tag: ', tag)
  //play embeded youtube video clip

  const elPlayer = document.querySelector('iFrame')
  elPlayer.src = `https://www.youtube.com/embed/${tag}`
}
