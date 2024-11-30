import { StatusBar, Text, Image, View, Alert, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useEffect } from 'react';
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';  // Add this new import
import { MaterialIcons } from '@expo/vector-icons';  // Add this import

const { width, height } = Dimensions.get('window');

export default function ExploreScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scanLineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startScanAnimation();
  }, []);

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnimation, {
          toValue: 350, // This should match your image height
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const prepareImageForUpload = async (uri: string) => {
    setIsLoading(true);
    try {
      // Read the image file
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileUri = fileInfo.uri;

      // Prepare the form data
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg', // or 'image/png'
        name: 'upload.jpg',
      } as any);

      console.log('Sending image to API...');
      console.log('Image URI:', uri);

      // Add IP address validation
      const apiUrl = 'http://52.62.154.58:8000/ask';  // Added port 8000 explicitly
      console.log('Sending request to:', apiUrl);

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000,
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}, body: ${response.data}`);
        }

        const data = response.data;
        console.log('API Response received:', data);

        if (data && data.prediction) {
          router.push({
            pathname: '/(results)/results',
            params: {
              prediction: data.prediction,
              imageBase64: data.image,
            },
          });
        }

      } catch (fetchError) {
        console.error('Fetch error details:', {
          message: fetchError.message,
          type: fetchError.type,
          code: fetchError.code,
        });
        throw new Error(`API request failed: ${fetchError.message}`);
      }

    } catch (error) {
      console.error('Upload error:', error);
      alert(`Error uploading image: ${error.message}\nPlease check your internet connection and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const openCamera = async () => {
    try {
      // Request camera permission
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to grant camera permission to use this feature.");
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImage(result.assets[0].uri);
        await prepareImageForUpload(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera Error:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const pickImage = async () => {
    try {
      // Launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImage(result.assets[0].uri);
        await prepareImageForUpload(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Gallery Error:', error);
      Alert.alert('Error', 'Failed to open gallery');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header} />
      
      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.button} 
          onPress={openCamera}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>'Use Camera to upload an image'</Text>
          </View>
        </Pressable>
        
        <Pressable 
          style={styles.button} 
          onPress={pickImage}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="photo-library" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Upload an image from gallery</Text>
          </View>
          
        </Pressable>

        <Pressable 
          style={styles.button} 
          onPress={() => {
            console.log('Navigating to /processing/review');
            router.replace('/(processing)/review');
          }}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Review</Text>
          </View>
        </Pressable>

      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/MpoxScanUp.png')}
          style={styles.mainImage}
        />
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [{ translateY: scanLineAnimation }],
              position: 'absolute',
              top: 20,  // Match the marginTop of mainImage
              zIndex: 1,  // Ensure it appears above the image
            },
          ]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={['transparent', '#5DB075', 'transparent']}
            style={styles.gradientLine}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            pointerEvents="none"
          />
        </Animated.View>
      </View>
      
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.uploadedImage}
        />
      )}
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Processing image...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
  },
  mainImage: {
    width: 350,
    height: 350,
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    top: 0,
    zIndex: 0,  // Ensure it's below the scanning line
  },
  titleContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#374151',
    fontWeight: 'bold',
  },

  buttonContainer: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 25,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 80,
    gap: 10,  // Space between buttons
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  button: {
    backgroundColor: '#5DB075',
    borderRadius: 24,
    minHeight: height * 0.06,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,  // Add padding for icon
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,  // Space between icon and text
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,  // This helps with text wrapping
  },
  uploadedImage: {
    width: 384,
    height: 384,
    marginBottom: 20,
    alignSelf: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
  },
  scanLine: {
    position: 'absolute',
    width: 600,  // Match the image width
    height: 4,
    backgroundColor: '#5DB075',
    opacity: 1,
    shadowColor: '#5DB075',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    zIndex: 1,
    pointerEvents: 'none',
  },
  gradientLine: {
    width: '100%',
    height: '100%',
  },
});