const musicAudio = document.getElementById("musicAudio");
const effectAudio = document.getElementById("effectAudio");
const shootAudio = document.getElementById("shootAudio");
const volumeIcon = document.getElementById("volume");
const MUTE_ICON = "fa fa-volume-off";
const LOUD_ICON = "fa fa-volume-down";
const DEFAULT_VOLUME = 0.5;

window.onload = function () {
    musicAudio.loop = true;
    musicAudio.volume = DEFAULT_VOLUME;
    effectAudio.volume = DEFAULT_VOLUME;
    shootAudio.volume = DEFAULT_VOLUME;
}

/* 
    background music only start playing when user interact with page
*/
if (performance.getEntriesByType("navigation").type === PerformanceEntry.TYPE_RELOAD) {
    volumeIcon.className = MUTE_ICON; 
}

function playMusicOnce() {
  musicAudio.play();
  volumeIcon.className = LOUD_ICON;
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

function playShoot(){
    shootAudio.currentTime = 0;
    shootAudio.play();
}

window.addEventListener('click', playEffect);

window.addEventListener('keydown', (ev) => {
    if(ev.key == ' '){
        playShoot();
    }else{
        playEffect();
    }
})
/* 
    adjust volume function
*/
document.getElementById("music").addEventListener('input', (event) => {
    const volume = event.target.value;
    musicAudio.volume = volume;
    if (volume == 0) {
        volumeIcon.className = MUTE_ICON;
    } else {
        volumeIcon.className = LOUD_ICON;
    }
});

document.getElementById("effect").addEventListener('input', (event) => {
    const volume = event.target.value;
    effectAudio.volume = volume;
    shootAudio.volume = volume;
});
