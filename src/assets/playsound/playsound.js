import Sound from 'react-native-sound';

const playSound = () => {
  const tada = require('./tada-a.flac');
  const lose = require('./lose.wav');

  const sound1 = new Sound(tada, (error, sound) => {
    if (error) {
      console.log(error);
      return;
    }
    sound.play(() => {
      sound.release();
    });
  });
};
const playSound_lose = () => {
  const sound = new Sound(audioList[1].url, (error, sound) => {
    if (error) {
      console.log(error);
      return;
    }
    sound.play(() => {
      sound.release();
    });
  });
};
