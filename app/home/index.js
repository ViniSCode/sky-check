import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import cloud from '../../assets/cloud.png';
import rain from '../../assets/rain.png';
import snow from '../../assets/snow.png';
import sun from '../../assets/sun.png';

export default function Home () {
  // Put the app in full screen mode
  StatusBar.setHidden(true, 'fade');

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [weatherImage, setWeatherImage] = useState(null);

  const date = new Date(); // replace this with the date you want to format
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
  
  // TRANSITIONS
  const fadeAnimWeather = useRef(new Animated.Value(0)).current;
  const fadeAnimSearchBar = useRef(new Animated.Value(0)).current;
  const fadeAnimDate = useRef(new Animated.Value(0)).current;
  const fadeAnimImage = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (weather) {
      Animated.timing(fadeAnimWeather, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
      Animated.timing(fadeAnimSearchBar, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
      Animated.timing(fadeAnimDate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
      Animated.timing(fadeAnimImage, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }
  }, [weather, fadeAnimWeather, fadeAnimSearchBar, fadeAnimDate, fadeAnimImage]);

  // WEATHER API
  const fetchWeather = async (defaultLocation) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location ? location : defaultLocation}&units=metric&appid=f50fb40048cb583c6797ce64964afdbe`
      );
      setWeather(response.data);
      setWeatherImage(getWeatherImageName(response.data.weather[0]));
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        // Client error, do nothing
        console.log("Client error: ", error.response.status);
      } else {
        // Other errors, log and handle as needed
        console.error("Error fetching weather: ", error);
      }
    }
  };
  
  useEffect(() => {
    let timer = setTimeout(async () => {
      if (location) {
        await fetchWeather();
      } else {
        await fetchWeather("New York");
      }
    }, 1000)

    return () => clearTimeout(timer);
  }, [location])

function getWeatherImageName(weather) {
    let weatherImageType;
  
    const groupId = Math.floor(weather?.id / 100);
    switch (groupId) {
      case 2:
        weatherImageType = rain;
        break;
      case 3:
        weatherImageType = rain;
        break;
      case 5:
        weatherImageType = rain;
        break;
      case 6:
        weatherImageType = snow;
        break;
      case 7:
        weatherImageType = cloud;
        break;
      case 8:
        if (weather.id === 800) {
          weatherImageType = sun;
        } else {
          weatherImageType = cloud;
        }
        break;
      default:
        weatherImageType = cloud;
        break;
    }
  
    return weatherImageType;
  }

  return (
    <LinearGradient
    colors={['#282626', '#030303']}
    style={styles.gradient}
    >
      {/* SEARCH BAR */}
      <Stack.Screen options={{
        headerShown: false,
      }} />
        <SafeAreaView style={styles.container} keyboardShouldPersistTaps="always">
          <Animated.View style={{ opacity: fadeAnimSearchBar }}>
            <View style={styles.search}>
              <Feather name="search" size={25} color="black" style={styles.searchIcon}/>
              <TextInput 
                placeholderTextColor="#585858"
                onChangeText={(value) => setLocation(value)}
                placeholder={weather?.name ? weather?.name: 'New York'}
                value={location}
                style={styles.input}
              />
            </View>
          </Animated.View>
          {/* WEATHER DISPLAY */}
          {
            weather && (
              <Animated.View style={{ opacity: fadeAnimWeather }}>
                <View style={styles.weatherContainer}>
                  <View style={styles.weatherInfo}>
                    {weatherImage && (
                      <Animated.Image 
                        style={[{opacity: fadeAnimImage}, styles.weatherImage]} 
                        source={weatherImage}
                        resizeMode="contain"
                      />)
                    }
                    <Text style={styles.temperature}>{weather?.main?.temp.toFixed()}°</Text>
                  </View>
                  <Text style={styles.description}>{weather?.weather[0]?.description}</Text>
                  <Text style={styles.location}>{weather?.name}, {weather?.sys?.country}</Text>
                </View>
              </Animated.View>
            )
          }

          <Animated.View style={{ opacity: fadeAnimDate }}>
            <View>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>
          </Animated.View>
        </SafeAreaView>
    </LinearGradient>
  )
}


export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 60,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 100,
  },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    borderBottomColor: '#585858' ,
    borderBottomWidth: 1,
    paddingVertical: 5,
    maxWidth: '95%',
    marginHorizontal: 'auto',
    position: 'relative',
    width: '100%',
  },
  input: {
    textAlign: 'center',
    color: '#585858',
    fontSize: 33,
    width: '100%',
    fontFamily: 'PR',
  },
  searchIcon: {
    color: '#585858',
    position: 'absolute',
    left: 10,
    top: 16,
  },
  weatherContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  weatherImage: {
    width: 110,
  },
  temperature: {
    color: 'white',
    fontSize: 92,
    fontFamily: 'PM',
  },
  location: {
    fontSize: 18,
    color: '#585858',
    fontFamily: 'PR',
  },
  description: {
    marginTop: 20,
    fontSize: 18,
    color: '#585858',
    fontFamily: 'PR',
  },
  date: {
    fontSize: 22,
    color: '#585858',
    fontFamily: 'PM',
  }
})