import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
}

export function FetchingModal({ visible }: Props) {
  return (
    <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={() => {}}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});
