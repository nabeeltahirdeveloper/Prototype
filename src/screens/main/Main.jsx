import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment} from 'react';
import styles from './mainStyle';
import useMain from './useMain';
import Button from '../../components/button/Button';
const plus = require('../../assets/plus.png');
const cross = require('../../assets/cross.png');

export default function Main() {
  const {
    onButtonPress,
    imagesArr,
    selectedImg,
    setSelectedImg,
    onSubmitHandler,
    loader,
    onGalleryPress,
    handleCancel,
    onDelPress
  } = useMain();
  return (
    <Fragment>
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1919'}}>
          <ActivityIndicator color={'green'} size="large" />
         <Text style={{color:'green', marginTop:5}}>Let's Merge Thoughts Together!</Text>
        
        </View>
      ) : (
        <View style={styles.container}>
          {imagesArr.length ? (
            <Image source={{uri: selectedImg}} style={{flex: 1}} />
          ) : null}
          <Text style={styles.heading}>RN + OpenCV Prototype</Text>
          {!imagesArr.length && (
            <View style={styles.btnContainer}>
              <Button
                btnText={'Start Capturing Photos'}
                btnStyle={[styles.selectBtn, styles.btnShadow]}
                textStyle={styles.btnText}
                onPress={onButtonPress}
              />
              {/* <Button
                btnText={'Select Photos From Gallery'}
                btnStyle={styles.selectBtn}
                textStyle={styles.btnText}
                onPress={onGalleryPress}
              /> */}
            </View>
          )}

          {imagesArr.length ? (
            <>
              <View style={[styles.imagesView]}>
                {imagesArr.map((img, index) => (
                  <View  key={index}> 
                  <TouchableOpacity activeOpacity={0.7} style={styles.crossBtn} onPress={() => onDelPress(img?.id)}>
                    <Image source={cross} style={{tintColor:'#FFFFFF', width:10, height: 10}}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedImg(img.uri)}>
                    <Image source={{uri: img.uri}} style={styles.imgStyle} />
                  </TouchableOpacity>
                  </View>
                ))}
                {imagesArr.length < 4 ? (
                  <TouchableOpacity
                    style={styles.addContainer}
                    onPress={onButtonPress}>
                    <Image source={plus} style={styles.plusIcon} />
                  </TouchableOpacity>

                ) : null}
              </View>
              <Button
                btnText={'Submit'}
                btnStyle={[
                  styles.selectBtn,
                  {
                    width: '95%',
                    marginBottom: 10,
                    backgroundColor: imagesArr.length < 2 ? 'gray' : 'green',
                  },
                ]}
                textStyle={styles.btnText}
                disabled={imagesArr.length < 2}
                onPress={onSubmitHandler}
              />
            </>
          ) : null}
        </View>
      )}
    </Fragment>
  );
}
