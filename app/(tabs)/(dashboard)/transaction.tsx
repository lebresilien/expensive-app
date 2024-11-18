import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, Alert, StatusBar } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UserContext } from '@/hooks/userContext';
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../lib/api';
import { useRouter } from 'expo-router';

export default function Item() {
  

  return (
    <ThemedView style={styles.container}>
        <ThemedText type="title">Explore</ThemedText>
        <ThemedText type="title">Explore</ThemedText>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    rowGap: 20,
    paddingTop: StatusBar.currentHeight
  },
});
