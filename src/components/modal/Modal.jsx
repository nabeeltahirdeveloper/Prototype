import {View, Modal, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import styles from './modalStyle';

export default function CustomModal(props) {
  const {modalOpen, setModalOpen, children} = props;
  const onCancel = () => {
    setModalOpen(false);
  };
  return (
    <Modal visible={modalOpen} transparent={true} onDismiss={onCancel}>
      <View style={styles.container}>
        <Pressable
          style={[styles.touchableContainer]}
          onPress={onCancel}></Pressable>
        <View style={styles.innerContainer}>
          <View style={styles.contentView}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}
