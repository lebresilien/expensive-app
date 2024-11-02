import { SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PagerView from 'react-native-pager-view';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnBoarding() {

    const [position, setPosition] = useState(0);
    const pagerRef = useRef<PagerView>(null); 

    const router = useRouter();

    const goToPage = async (index: number) => {
      if(index === 3) {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        router.navigate('/login');
      }
      pagerRef.current?.setPage(index); 
      setPosition(index);
    }

    const skip = async() => {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      router.navigate('/login');
    }

  return (
    <SafeAreaView style={styles.safe}>
      <PagerView 
        style={styles.container} 
        ref={pagerRef}
        initialPage={0} 
        onPageSelected={(e: any) => setPosition(e.nativeEvent.position)}
      >
        <ThemedView key="1" style={styles.page}>

          <ThemedView style={styles.title_block}>
            <ThemedText type='title'>Expensive App</ThemedText>
          </ThemedView>

          <ThemedView style={styles.image_block}>
              <Image
                source={require('@/assets/images/react-logo.png')}
                style={styles.logo}
              />
          </ThemedView>

          <ThemedView style={styles.indicator_block}>
            {Array.from({ length: 3 }, (_, index) => (
              <ThemedView style={[styles.badge, index == position && styles.badge_background]} key={index}></ThemedView>
            ))}
          </ThemedView>

          <ThemedView style={styles.text_block}>
            <ThemedText type='title' style={styles.textCenter}>Gestion simplifiée de vos dépenses</ThemedText>
            <ThemedText type='subtitle' style={styles.textCenter}>
              Prenez le controle de vos dépenses. Planifiez, organisez et gérez chaque 
              dépense de maniere efficace
            </ThemedText>
          </ThemedView>

        </ThemedView>

        <ThemedView key="2" style={styles.page}>
        <ThemedView style={styles.title_block}>
            <ThemedText type='title'>Expensive App</ThemedText>
          </ThemedView>

          <ThemedView style={styles.image_block}>
              <Image
                source={require('@/assets/images/react-logo.png')}
                style={styles.logo}
              />
          </ThemedView>

          <ThemedView style={styles.indicator_block}>
            {Array.from({ length: 3 }, (_, index) => (
              <ThemedView style={[styles.badge, index === position && styles.badge_background]} key={index}></ThemedView>
            ))}
          </ThemedView>

          <ThemedView style={styles.text_block}>
            <ThemedText type='title' style={styles.textCenter}>Suivez toutes vos depenses</ThemedText>
            <ThemedText type='subtitle' style={styles.textCenter}>
              Definez un budget mensuel ou semestriel et nous nous chargeons de repartir cela pour vous
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView key="3" style={styles.page}>
        <ThemedView style={styles.title_block}>
            <ThemedText type='title'>Expensive App</ThemedText>
          </ThemedView>

          <ThemedView style={styles.image_block}>
              <Image
                source={require('@/assets/images/react-logo.png')}
                style={styles.logo}
              />
          </ThemedView>

          <ThemedView style={styles.indicator_block}>
            {Array.from({ length: 3 }, (_, index) => (
              <ThemedView style={[styles.badge, index === position && styles.badge_background]} key={index}></ThemedView>
            ))}
          </ThemedView>

          <ThemedView style={styles.text_block}>
            <ThemedText type='title' style={styles.textCenter}>Optimiser vous revenus sereinnement</ThemedText>
            <ThemedText type='subtitle' style={styles.textCenter}>
              Prenez le controle de vos dépenses. Nous vous presentons les elements qui vous perdre de l'argent, 
              pour que vous pussiez rester focus sur l'essentiel
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </PagerView>
      <ThemedView style={styles.skip_block}>
        <TouchableOpacity onPress={skip} style={{flex: 1}}>
          <ThemedView style={styles.skip_button}>
            <ThemedText style={{color: '#DDDDDD', fontWeight: '600'}}>Passer</ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToPage(position + 1)} style={{flex: 1}}>
          <ThemedView style={styles.next_button}>
            <ThemedText style={styles.textWhite}>
              { position === 2 ? 'Commencer' : 'Suivant' }
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  title_block: {
    flex: .5,
    justifyContent: 'center',
  },
  image_block: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 258,
    width: 290,
    bottom: 0,
    left: 0,
  },
  text_block: {
    flex: 1,
    rowGap: 10,
    alignItems: 'center',
  },
  skip_block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    columnGap: 10
  },
  next_button: {
    width: '100%',
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#0ea5e9',
    alignItems: 'center'
  },
  skip_button: {
    width: '100%',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  textWhite: {
    color: 'white'
  },
  indicator_block: {
    flex: .2,
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#0ea5e9'
  },
  badge_background: {
    backgroundColor: '#0ea5e9',
  }
});
