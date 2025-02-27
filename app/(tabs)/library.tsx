import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';  
import { skinLesionData } from '../data/skinLesionData'

const Library = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const router = useRouter();

  const buttons = [
    { title: 'Skin Lesions' },
    { title: 'Safety Protocols' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Custom Tab Button */}
        <View style={styles.tabContainer}>
          {buttons.map((button, index) => {
            const isSelected = selectedTab === index;
            return (
              <Pressable
                key={index}
                style={[
                  styles.tab,
                  { backgroundColor: isSelected ? 'white' : 'transparent' }
                ]}
                onPress={() => setSelectedTab(index)}
              >
                <Text style={[
                  styles.tabText,
                  { color: isSelected ? '#5DB075' : 'gray' }
                ]}>
                  {button.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {selectedTab === 0 ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            { minHeight: Dimensions.get('window').height + 1 }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* First Row */}
          <View style={styles.row}>
            <View style={styles.card}>
              <Pressable 
                onPress={() => {
                  console.log('Pressing monkeypox');
                  router.push({
                    pathname: "/(screens)/skinlesion",
                    params: { id: 'monkeypox' }
                  });
                }}
              >
                <Image
                  source={require('../../assets/images/monkeypox.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Monkeypox</Text>
              </Pressable>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Pressable 
                onPress={() => {
                  console.log('Pressing actinic');
                  router.push({
                    pathname: "/(screens)/skinlesion",
                    params: { id: 'actinicKeratosis' }
                  });
                }}
              >
                <Image
                  source={require('../../assets/images/actinickeratosis.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Actinic Keratosis</Text>
              </Pressable>
            </View>
          </View>

          {/* Second Row */}
          <View style={styles.row}>
            <View style={styles.card}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "basalcellcarcinoma" }
              })}>
                <Image
                  source={require('../../assets/images/basal.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Basal Cell Carcinoma</Text>
              </Pressable>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "benign" }
              })}>
                <Image
                  source={require('../../assets/images/benign.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Benign Keratosis</Text>
              </Pressable>
            </View>
          </View>

          {/* Third Row */}
          <View style={styles.row}>
            <View style={styles.card}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "chickenpox" }
              })}>
                <Image
                  source={require('../../assets/images/chickenpox.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Chickenpox</Text>
              </Pressable>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "cowpox" }
              })}>
                <Image
                  source={require('../../assets/images/cowpox.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Cowpox</Text>
              </Pressable>
            </View>
          </View>

          {/* Fourth Row */}
          <View style={styles.row}>
            <View style={styles.card}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "dermatofibroma" }
              })}>
                <Image
                  source={require('../../assets/images/derma.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Dermatofibroma</Text>
              </Pressable>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "hfmd" }
              })}>
                <Image
                  source={require('../../assets/images/hfmd.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>HFMD</Text>
              </Pressable>
            </View>
          </View>

          {/* Fifth Row */}
          <View style={styles.row}>
            <View style={styles.card}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "measles" }
              })}>
                <Image
                  source={require('../../assets/images/measles.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Measles</Text>
              </Pressable>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "melanocyticNevus" }
              })}>
                <Image
                  source={require('../../assets/images/melanocytic.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Melonocytic Nevus</Text>
              </Pressable>
            </View>
          </View>

          {/* Sixth Row */}
          <View style={styles.row}>
            <View style={styles.card}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "melanoma" }
              })}>
                <Image
                  source={require('../../assets/images/melanoma.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Melanoma</Text>
              </Pressable>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "squamousCellCarcinoma" }
              })}>
                <Image
                  source={require('../../assets/images/squamous.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={[styles.cardText, { fontSize: 10 }]}>Squamous Cell Carcinoma</Text>
              </Pressable>
            </View>
          </View>

          {/* Seventh Row */}
          <View style={styles.row}>
            <View style={[styles.card, styles.cardLeft]}>
              <Pressable onPress={() => router.push({
                pathname: "/(screens)/skinlesion",
                params: { id: "vascularLesion" }
              })}>
                <Image
                  source={require('../../assets/images/vascular.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>Vascular Lesion</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      ) : (

        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.protocolsContainer}>
            <Pressable 
              onPress={() => router.push({
                pathname: "/(screens)/safetyprotocols",
                params: { id: "infected" }
              })}
              style={styles.protocolContainer}
            >
              <Image
                source={require('../../assets/images/infected.png')}
                style={styles.protocolImage}
                resizeMode="contain"
              />
              <View style={styles.protocolTextContainer}>
                <Text style={styles.protocolTitle}>What to do when infected?</Text>
                <Text style={styles.protocolDescription}>
                  What should you do when you are infected with the virus.
                </Text>
              </View>
            </Pressable>

            {/* Second Row */}
            <Pressable 
              onPress={() => {
                console.log('Pressing signs protocol');
                router.push({
                  pathname: "/(screens)/safetyprotocols",
                  params: { id: "signs" }
                });
              }}
              style={styles.protocolContainer}
            >
              <Image
                source={require('../../assets/images/signs.png')}
                style={styles.protocolImage}
                resizeMode="contain"
              />
              <View style={styles.protocolTextContainer}>
                <Text style={styles.protocolTitle}>Signs that you are infected</Text>
                <Text style={styles.protocolDescription}>
                  What are the signs that you are likely to be infected?
                </Text>
              </View>
            </Pressable>

          {/* Third Protocol */}
          <Pressable 
                onPress={() => router.push({
                  pathname: "/(screens)/safetyprotocols",
                  params: { id: "symptoms" }
                })}
                style={styles.protocolContainer}
              >
                <Image
                  source={require('../../assets/images/symptoms.png')}
                  style={styles.protocolImage}
                  resizeMode="contain"
                />
                <View style={styles.protocolTextContainer}>
                  <Text style={styles.protocolTitle}>Common Symptoms</Text>
                  <Text style={styles.protocolDescription}>
                    Have you got these symptoms?
                  </Text>
                </View>
              </Pressable>

              {/* Fourth Protocol */}
              <Pressable 
                onPress={() => router.push({
                  pathname: "/(screens)/safetyprotocols",
                  params: { id: "isolation" }
                })}
                style={styles.protocolContainer}
              >
                <Image
                  source={require('../../assets/images/isolation.png')}
                  style={styles.protocolImage}
                  resizeMode="contain"
                />
                <View style={styles.protocolTextContainer}>
                  <Text style={styles.protocolTitle}>Self Isolation 101</Text>
                  <Text style={styles.protocolDescription}>
                    Quarantine again? It's already 2024.
                  </Text>
                </View>
              </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
    padding: 2,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'rgba(128, 128, 128, 0.3)',
  },
  tab: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  tabText: {
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  card: {
    width: Dimensions.get('window').width * 0.42, // ~42% of screen width
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#5DB075',
    marginHorizontal: Dimensions.get('window').width * 0.02, // 2% margin
    alignSelf: 'center',
  },
  cardRight: {
    marginLeft: Dimensions.get('window').width * 0.02, // 2% margin
  },
  cardLeft: {
    marginLeft: Dimensions.get('window').width * 0.02, // 2% margin
  },
  image: {
    width: '100%',
    aspectRatio: 1.2, // Maintain consistent aspect ratio
    height: undefined, // Let height be determined by aspect ratio
  },
  cardText: {
    fontSize: Math.max(12, Dimensions.get('window').width * 0.035), // Responsive font size with minimum
    fontWeight: '600',
    margin: 8,
    color: '#FFFFFF',
  },
  protocolContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center-align items
    backgroundColor: '#fff', // White background
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // For Android shadow
  },
  protocolImage: {
    width: 60,
    height: 60,
  },
  protocolTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  protocolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5DB075',
  },
  protocolDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  protocolsContainer: {
    flex: 1,
    paddingBottom: 100, // Add extra padding at bottom
  },
});

export default Library;