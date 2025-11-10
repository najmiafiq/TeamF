const musicAudio = document.getElementById("musicAudio");
const effectAudio = document.getElementById("effectAudio");
const volumeIcon = document.getElementById("volume");
const muteIcon = "fa fa-volume-off";
const loudIcon = "fa fa-volume-down";
const defaultVolume = 0.5;

window.onload = function () {
    musicAudio.loop = true;
    musicAudio.volume = defaultVolume;
    effectAudio.volume = defaultVolume;
}

/* 
    background music only start playing when user interact with page
*/
if (performance.getEntriesByType("navigation").type === PerformanceEntry.TYPE_RELOAD) {
    volumeIcon.className = muteIcon; 
}

function playMusicOnce() {
  musicAudio.play();
  volumeIcon.className = loudIcon;
  window.removeEventListener("click", playMusicOnce);
  window.removeEventListener("keydown", playMusicOnce);
}

window.addEventListener("click", playMusicOnce);
window.addEventListener("keydown", playMusicOnce);

/* 
    effect music triggered when user interact with page
*/
function playEffect(){
    effectAudio.currentTime = 0.14;
    effectAudio.play();
}

window.addEventListener('click', playEffect);
window.addEventListener('keydown', playEffect);

/* 
    adjust volume function
*/
document.getElementById("music").addEventListener('input', (event) => {
    let volume = event.target.value;
    musicAudio.volume = volume;
    if (volume == 0) {
        volumeIcon.className = muteIcon;
    } else {
        volumeIcon.className = loudIcon;
    }
});

document.getElementById("effect").addEventListener('input', (event) => {
    effectAudio.volume = event.target.value;
});
