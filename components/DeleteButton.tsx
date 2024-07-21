import React from 'react';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { removeCustomData, removeValue, clearAll } from '../lib/storage';
import { deleteSuggestAnnouncement } from '../lib/suggest';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface DeleteButtonProps {
  _id?: string;
  id: string;
}

export function DeleteButton({ _id, id }: DeleteButtonProps) {
  const router = useRouter();

  const handlePress = async () => {
    if (_id) {
      const response = await deleteSuggestAnnouncement(_id);
      if (response.success) {
        await removeCustomData(id);
        console.log('Announcement deleted successfully');
        router.push('(tabs)'); // Adjust as needed
      } else {
        console.error('Failed to delete announcement:', response.msg);
      }
    } else {
      await removeCustomData(id);
      console.log('No _id provided');
      router.push('(tabs)');
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <AntDesign name='delete' color='gray' size={40} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});
