import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  innerContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
    width: '95%',
  },
  modalCloseBtn: {
    alignSelf: 'flex-end',
    padding: 3,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  contentView: {
    marginTop: 10,
  },
});
export default styles;
