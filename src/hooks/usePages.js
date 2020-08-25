import {useState} from 'react';

export const usePages = (initialState = 0) => {
  const [state, setState] = useState(initialState);

  const nextText = () => {
    setState(state + 1);
  };

  const backText = () => {
    setState(state - 1);
  };

  return {
    state,
    nextText,
    backText,
  };
};
