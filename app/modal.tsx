import { Link, router } from 'expo-router';
import { Image, Pressable, Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons/';
import { Linking } from 'react-native';

export default function Modal() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Information</Text>
          <Text style={styles.text}>
            Salut, je suis John, le créateur de cette application. J'ai créé cette application parce que l'application web app est trop lente et
            qu'elle ne permet pas d'ajouter une annonce personnalisée.
          </Text>
          <View style={styles.contentContainer}>
            <Text style={styles.subTitle}>Comment utiliser cette application?</Text>
            <View style={styles.textContainer}>
              <View style={styles.withNote}>
                <Text>
                  Lorsque vous lancez l'application pour la première fois, elle télécharge les données à partir d'un serveur, puis les enregistre
                  localement dans votre appareil mobile.
                </Text>
                <Text style={styles.note}>
                  Note : Cela peut prendre du temps car j'utilise un hébergeur gratuit pour le serveur, où il s'éteint s'il n'y a pas de demande sur
                  le serveur. Cela peut prendre de 1 à 5 minutes.
                </Text>
              </View>
              <Text>Une fois les données téléchargées, vous pouvez accéder à toutes les annonces hors ligne.</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.subTitle}>Comment voir les annonces?</Text>
            <View style={styles.textContainer}>
              <Text>Il existe trois catégories d'annonces : Général, Temps réel et Urgent.</Text>
              <Text>Vous choisissez une des catégories, vous verrez alors une liste d'annonces.</Text>
              <Text>Cliquez ensuite sur l'annonce que vous souhaitez lire.</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.subTitle}>Comment ajouter un favori?</Text>
            <View style={styles.textContainer}>
              <Text>Lorsque vous êtes sur une page d'annonce, une étoile apparaît en haut à droite.</Text>
              <Text>Cliquez sur l'étoile pour ajouter un favori. Elle deviendra jaune et vous pourrez alors la voir dans vos favoris.</Text>
              <Text>Pour l'enlever de vos favoris, vous pouvez cliquer sur l'étoile jaune, qui deviendra grise.</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.subTitle}>Comment puis-je suggérer une annonce?</Text>
            <View style={styles.textContainer}>
              <Text>Vous avez une annonce à faire partager à tout le monde ?!</Text>
              <View style={styles.contactContainer}>
                <Text>Vous pouvez me contacter soit via :</Text>
                <View style={styles.contactList}>
                  <Pressable onPress={() => Linking.openURL('mailto:john4e656f@gmail.com')} style={styles.contactItem}>
                    <View style={styles.contactItem}>
                      <MaterialIcons name='email' size={24} color='#005BB8' />
                      <Text style={styles.contactText}>john4e656f@gmail.com</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/john4e656f/')} style={styles.contactItem}>
                    <AntDesign name='linkedin-square' size={24} color='#005BB8' />
                    <Text style={styles.contactText}>john4e656f</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Link href='/adminPage' asChild>
              <Pressable>
                <Text>Admin Login</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  subContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  contentContainer: {
    gap: 15,
  },
  textContainer: {
    gap: 15,
    paddingHorizontal: 20,
  },
  contactContainer: {
    gap: 15,
  },
  contactList: {
    gap: 5,
  },
  contactItem: {
    alignContent: 'center',
    gap: 5,
    flexDirection: 'row',
  },
  contactText: {
    color: '#005BB8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'medium',
  },
  text: {},
  withNote: {
    gap: 5,
  },
  note: {
    fontSize: 12,
  },
});
