import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import type { AnnounceProps } from '../types';
import { storeFavoriteData, getStoredFavoriteDataById, removeFavoriteData, removeValue, clearAll } from '../lib/storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

async function addOrRemove(isFavorite: boolean, data: AnnounceProps) {
  // If it's already a favorite, remove it
  // removeValue()
  // clearAll();
  if (isFavorite) {
    await removeFavoriteData(data.id!);
    return false;
  } else {
    await storeFavoriteData(data);
    return true;
  }
}

export function FavoriteButton({ data }: { data: AnnounceProps }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const storedData = await getStoredFavoriteDataById(data._id!);
        // console.log('Favorite Button:', storedData);

        if (storedData !== null) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error fetching announcement data:', error);
      }
    }
    fetchAnnouncement();
  }, []);

  const handlePress = async () => {
    const favoriteState = await addOrRemove(isFavorite, data);
    setIsFavorite(favoriteState);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {!isFavorite ? <FontAwesome name='star' color='gray' size={40} /> : <FontAwesome name='star' color='yellow' size={40} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginLeft: 'auto',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});
