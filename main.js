const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector(' audio'), // here we don't use class
      progressContainer = document.querySelector('.progress_container'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.cover_img'),
      imgSrc = document.querySelector('.btn.play i')

      // Songs titles
      const songs = ['Mandala','Disfruto','Ass Like That','Kak Mommy','Medina','Roses','Pulling Up','Auf','Balenciaga','Siadou','Petrunko','Sugar']

      // Default song
      let songIndex = 0

      // Init
      function loadSong(song) {
        title.innerHTML = song
        audio.src = `audio/${song}.mp3`
        // cover.src = ``
      }
      loadSong(songs[songIndex])

      //Play
      function playSong(){
        player.classList.add('play')
        cover.classList.add('active')
        imgSrc.className = 'fa-solid fa-pause';
        audio.play()
      }
      

       //Pause 
       function pauseSong(){
        player.classList.remove('play')
        cover.classList.remove('active')
        imgSrc.className = 'fa-solid fa-play';
        audio.pause()
      }

      playBtn.addEventListener('click', () => { 
       const isPlaying = player.classList.contains('play')
       if (isPlaying){
        pauseSong()
       } else {
        playSong()
       }
      })

      // Next song
      function nextSong(){
        songIndex++
        if (songIndex > songs.length -1){
            songIndex = 0 
        }
        loadSong(songs[songIndex])
        playSong()
     }
        nextBtn.addEventListener('click', nextSong)
     
      // Prev song
      function prevSong(){
        songIndex--
        if (songIndex <  0){
            songIndex = songs.length -1 
        }
        loadSong(songs[songIndex])
        playSong()
     }
        prevBtn.addEventListener('click', prevSong)

      // Progress Bar

      function updateProgress(e) {
        const {duration, currentTime} = e.srcElement 
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`

      }
      audio.addEventListener('timeupdate', updateProgress)

      // Set progress
      function setProgress(e) {
        const width = this.clientWidth
        const clickX = e.offsetX
        const duration = audio.duration

        audio.currentTime = (clickX / width) * duration
      }
      progressContainer.addEventListener('click', setProgress)

      // Autoplay
      audio.addEventListener('ended', nextSong)
     
