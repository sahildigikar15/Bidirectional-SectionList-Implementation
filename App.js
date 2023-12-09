import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import RenderMovies from './screens/RenderMovies'
import MovieDetails from './screens/MovieDetails';
import { StatusBar, Image, StyleSheet, View, FlatList, Text} from 'react-native';

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <>
      <StatusBar backgroundColor="#1E1E1E" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Movies">
          <Stack.Screen
            name="Movies"
            component={RenderMovies}
            options={{
              // headerShown: false,
              headerTitle:"",
              headerStyle: {
                // height: 250
              },
              headerBackground: () => (
                <View style={{...styles.headerContainer}}>
                  <Image
                  style={styles.logo}
                  source={
                     require('./assets/logo.png')
                  }
                />
                </View>
              ),
            }}
          />
          <Stack.Screen name="Details" component={MovieDetails} 
            options={{
              // headerShown: false,
              headerTitle:"",
              headerStyle: {
                // height: 250
              },
              headerBackground: () => (
                <View style={{...styles.headerContainerDetails}}>
                  <Image
                  style={styles.logoDetails}
                  source={
                     require('./assets/logo.png')
                  }
                />
                </View>
              ),
              headerTintColor: "white",
              
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: "#242424",
    paddingLeft: 10
    // alignItems: "center"
    // borderWidth: 1,
    // borderColor: "red",
    
    // height: 200
  },
  headerContainerDetails: {
    flex: 1,
    backgroundColor: "#242424",
    //  alignItems: "center"
    paddingLeft: 50
  },
  logo: {
    // paddingTop: 
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
    resizeMode: "contain",
    margin: 10
  },
  logoDetails: {
    resizeMode: "contain",
    // marginLeft: 50,
    marginTop: 10

  }
})

export default Home;
