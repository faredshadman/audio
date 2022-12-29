const wrapper = document.querySelector(".wrapper"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = progressArea.querySelector(".progress-bar"),
  moreMusicBtn = wrapper.querySelector("#more-music"),
  volume = wrapper.querySelector(".volume");

let isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic();
});

function loadMusic() {
  mainAudio.src =
    "https://fs.neurotime.ai/audios/106.3fm-2022-12-28-15-00-04_maricel_-_17_saniyə_-2022-12-28-15-59-48.mp3";
}

//play music function
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//pause music function
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// play or pause button event
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();
});
volume.addEventListener("click", () => {
  let volumeText = volume.innerText;
  volumeText == "volume_up"
    ? (volume.innerText = "volume_off")
    : (volume.innerText = "volume_up");
  mainAudio.muted = !mainAudio.muted;
});

//prev music button event
prevBtn.addEventListener("click", () => {
  mainAudio.currentTime -= 5;
});

//next music button event
nextBtn.addEventListener("click", () => {
  mainAudio.currentTime += 5;
});
mainAudio.addEventListener("loadeddata", (e) => {
  const musicDuration = wrapper.querySelector(".max-duration");
  let mainAdDuration = e.target.duration;
  let totalMin = Math.floor(mainAdDuration / 60);
  let totalSec = Math.floor(mainAdDuration % 60);
  totalSec = totalSec < 10 ? `0${totalSec}` : totalSec;
  musicDuration.innerText = `${totalMin}:${totalSec}`;
});
// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time");

  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  console.log("width", progressWidth); //getting width of progress bar
  let clickedOffsetX = e.offsetX;
  console.log("offset", clickedOffsetX); //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
});

//code for what to do after song ended
mainAudio.addEventListener("ended", () => {});
