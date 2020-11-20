import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {CheckBox} from 'react-native-elements';

export default function Argument({
  id,
  text,
  argument,
  setArgument,
  stateArgument,
  setStateArgument,
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (stateArgument[id]) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [stateArgument]);

  const resp = () => {
    setChecked(!checked);
    setStatusArgument();
    if (!checked) {
      console.log('agrego argumento');
      setArgument([...argument, {id, argument: text}]);
    } else {
      console.log('elimino argumento');
      const data = argument.filter((arg) => id !== arg.id);
      setArgument(data);
    }
  };

  const setStatusArgument = () => {
    const data = stateArgument;
    data[id] = !checked;
    setStateArgument(data);
  };
  return (
    <View>
      <CheckBox
        title={text}
        checked={checked}
        key={id}
        textStyle={{fontSize: 10, textAlign: 'justify', marginRight: 30}}
        containerStyle={{width: 280}}
        onPress={resp}
      />
    </View>
  );
}
