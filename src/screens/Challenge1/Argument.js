import React, {useState} from 'react';
import {View} from 'react-native';
import {CheckBox} from 'react-native-elements';

export default function Argument({id, text, argument, setArgument}) {
  const [checked, setChecked] = useState(false);

  const resp = () => {
    setChecked(!checked);

    if (!checked) {
      setArgument([...argument, {id, argument: text}]);
    } else {
      const data = argument.filter((arg) => id !== arg.id);
      setArgument(data);
    }
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
