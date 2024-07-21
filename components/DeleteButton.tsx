import React from 'react';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { removeCustomData, storeAllData, removeValue, clearAll } from '../lib/storage';
import { deleteSuggestAnnouncement } from '../lib/suggest';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface DeleteButtonProps {
  _id?: string;
  id: string;
  isAdmin?: Boolean;
  code?: Number;
}

export function DeleteButton({ _id, id, isAdmin, code }: DeleteButtonProps) {
  const router = useRouter();

  const handlePress = async () => {
    if (isAdmin) {
      const response = await fetch(`https://myannouncement-be.onrender.com/announce/suggest/delete/${_id}/${code}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const response = await fetch('https://myannouncement-be.onrender.com/announce/all');
        const newData = await response.json();
        await storeAllData({ data: newData });
      }

      router.push('(tabs)');
    } else if (_id) {
      const response = await deleteSuggestAnnouncement(_id);
      if (response.success) {
        await removeCustomData(id);
        console.log('Announcement deleted successfully');
        router.push('(tabs)');
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
