import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import type { AnnounceProps } from '../types/AnnounceProps';
import { storeFavoriteData, getStoredFavoriteDataById, removeFavoriteData, removeValue } from '../lib/storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function addOrRemove(isFavorite: boolean, data: AnnounceProps) {
  // If it's already a favorite, remove it
  // removeValue()
  if (isFavorite) {
    removeFavoriteData(data._id!);
    return false;
  } else {
    storeFavoriteData(data);
    return true;
  }
}

export function FavoriteButton({ data }: { data: AnnounceProps }) {
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handlePress = () => {
    const favoriteState = addOrRemove(isFavorite, data);
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
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});
