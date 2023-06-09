import {View, Text, Image, Platform, PermissionsAndroid} from 'react-native';
import React from 'react';
import Button from '../../components/button/Button';
import styles from './finalStyle';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';
export default function Final({route, navigation}) {
  const {encodedBase64} = route.params;

  function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  let checkForDownloadedFolder = path => {
    return new Promise((resolve, reject) => {
      RNFS.readDir(path)
        .then(resolve)
        .catch(() => {
          RNFS.mkdir(path, {
            NSURLIsExcludedFromBackupKey: true,
          })
            .then(resolve)
            .catch(reject);
        });
    });
  };
  const handleSaveImage = async () => {
    let imageName = `${generateUUID()}.jpeg`;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permission to access gallery',
        message: 'Access to your gallery is needed to select images',
        buttonPositive: 'OK',
      },
    );
    const pathImage = RNFetchBlob?.fs?.dirs?.DownloadDir + '/test';
    await checkForDownloadedFolder(pathImage);
    RNFS.writeFile(`${pathImage}/${imageName}`, encodedBase64, 'base64')
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'File Saved Successfully!',
        });
        console.log(`${RNFS.DocumentDirectoryPath}/${imageName}`);
        console.log('File saved successfully!');
        //   let photo ={
        //     path:`file://${RNFS.DocumentDirectoryPath}/${imageName}`
        //   }
        //   imagePath =`file://${RNFS.DocumentDirectoryPath}/${imageName}`;
        //   console.log("RNFetchBlob?.fs?.dirs", RNFetchBlob?.fs?.dirs)
        //     const fileLocation = RNFetchBlob?.fs?.dirs?.DownloadDir + "/test"
        //     const fileNameArray= photo?.path.split('/')
        //     const fileName = fileNameArray[fileNameArray.length-1];
        //     console.log('fileName', fileName)

        // RNFetchBlob.fs.cp(photo.path, fileLocation)
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={{uri: `data:image/png;base64,${encodedBase64}`}}
        style={[styles.container, {marginTop: 10}]}
        resizeMode={'center'}
      />
      <View style={styles.btnsView}>
        <Button
          btnText="Save"
          btnStyle={[styles.btnStyle, {marginBottom: 10}]}
          textStyle={styles.btnText}
          onPress={handleSaveImage}
        />
        <Button
          btnText="Back"
          btnStyle={[
            styles.btnStyle,
            {borderColor: 'red', borderWidth: 2, backgroundColor: '#1a1919'},
          ]}
          textStyle={[styles.btnText, {color: 'red'}]}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
