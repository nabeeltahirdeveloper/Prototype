import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1919',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnShadow: {
    shadowColor: '#6c994d',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  selectBtn: {
    alignSelf: 'center',
    backgroundColor: 'green',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 50,
    marginBottom: '10%',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  imagesView: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  imgStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },
  addContainer: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  plusIcon: {
    tintColor: '#FFFFFF',
  },
  crossBtn:{
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -2,
    right: 9,
    zIndex: 999
  }
});

export default styles;
