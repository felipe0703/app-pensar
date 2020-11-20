import Sound from 'react-native-sound';

export const playSound_correct = () => {
  const sound1 = new Sound(
    require('../../assets/playsound/correct1.wav'),
    (error, sound) => {
      if (error) {
        console.log(error);
      }
      sound1.play();
    },
  );
};

export const playSound_incorrect = () => {
  const sound1 = new Sound(
    require('../../assets/playsound/incorrect1.wav'),
    (error, sound) => {
      if (error) {
        console.log(error);
      }
      sound1.play();
    },
  );
};

export const playSound_feedback = () => {
  const sound1 = new Sound(
    require('../../assets/playsound/feedback.wav'),
    (error, sound) => {
      if (error) {
        console.log(error);
      }
      sound1.play();
    },
  );
};

export const playSound_congratulation = () => {
  const sound1 = new Sound(
    require('../../assets/playsound/congratulation.wav'),
    (error, sound) => {
      if (error) {
        console.log(error);
      }
      sound1.play();
    },
  );
};
