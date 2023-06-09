import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';



export default function useMain() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imagesArr, setImagesArr] = useState([]);
  const [selectedImg, setSelectedImg] = useState('');
  const abortController = new AbortController();
  var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  const uid = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };


  const url = 'http://nabeeltahirdev.pythonanywhere.com/upload';
  let options = {
    storageOptions: {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false,

      //   includeExtra,
    },
  };
  const onButtonPress = () => {
    ImagePicker.launchCamera([options], response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response?.assets?.[0]?.uri;
        const type = response?.assets?.[0]?.type;
        const fileName = response?.assets?.[0]?.fileName;
        setSelectedImg(uri);
        setImagesArr([
          ...imagesArr,
          {uri: uri, type: type, fileName: fileName, id: uid(8)},
        ]);
      }
    });
  };

  const onGalleryPress = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access gallery',
          message: 'Access to your gallery is needed to select images',
          buttonPositive: 'OK',
        },
      );

      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const uri = response?.assets?.[0]?.uri;
          const type = response?.assets?.[0]?.type;
          const fileName = response?.assets?.[0]?.fileName;
          setSelectedImg(uri);
          setImagesArr([
            ...imagesArr,
            {uri: uri, type: type, fileName: fileName},
          ]);
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };



  const onSubmitHandler = async () => {
    setLoader(true);

    const formData = new FormData();
    imagesArr.forEach(file => {
      formData.append('files', {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });
    });
    // const response = await axios.post(url, formData);
    try {

      fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        console.log("successfully get")
        // console.log("text", res.text())
        return res.text()
      })
      .then(data => {        
        var base64String = data
        console.log("data", data)
        if(!base64regex.test(data)){
          setLoader(false)
          return Toast.show({
            type: 'error',
            text1: 'Oops! It seems your pictures have no similar area',
            text2: "It's better if you retake",
          });
        }
        setLoader(false);
        setImagesArr([]);
        setSelectedImg('');
        navigation.navigate('Final', {encodedBase64: data});

      })
      .catch(error => {
        console.error('File upload failed', error);
      });
  


    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCancel=() => {
    console.log('press cancel')
    abortController.abort();
    setLoader(false);
  }

  const onDelPress=(id) => {
    const filteredArr = imagesArr.filter((image) => image.id !== id)
    setImagesArr(filteredArr)
  }


  
  

  return {
    onButtonPress,
    isModalVisible,
    setIsModalVisible,
    imagesArr,
    selectedImg,
    setSelectedImg,
    onSubmitHandler,
    loader,
    onGalleryPress,
    handleCancel,
    onDelPress
  };
}
