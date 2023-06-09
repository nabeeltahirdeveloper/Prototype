import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Button(props) {
  const {btnText, btnStyle, textStyle, onPress, disabled} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={btnStyle}
      onPress={onPress}
      disabled={disabled}>
      <Text style={textStyle}>{btnText}</Text>
    </TouchableOpacity>
  );
}
