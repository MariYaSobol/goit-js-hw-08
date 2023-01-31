import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_LOCAL = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(KEY_LOCAL, data.seconds);
}
function currentTime() {
  const time = localStorage.getItem(KEY_LOCAL);
  if (time) {
    player.setCurrentTime(time);
  }
}
currentTime();
