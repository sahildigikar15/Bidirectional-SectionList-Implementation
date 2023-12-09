import { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import { GETMOVIEDETAILS } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from 'react-native-dotenv'

const SimilarMovies = ({movieId}) => {
    const [similarMovies, setSimilarMovies] = useState({});
    const navigation = useNavigation()

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async() => {
        const similarMoviesData = await fetch(GETMOVIEDETAILS + `${movieId}/similar?api_key=${API_KEY}`);
        const similarMoviesInfo = await similarMoviesData.json();
        setSimilarMovies(similarMoviesInfo?.results?.slice(0,10));
    }
    return (
      <>
        <Text style={styles.moviesTitle}>Similar Movies ›</Text>
        <FlatList
          data={similarMovies}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>navigation.push("Details",{
                movieId: item.id
            })}>
              <View style={styles.movieInfo}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.movieImage}
                />
                <View style={styles.movieTitle}>
                  <Text style={styles.title}>{item.original_title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </>
    );
}

const styles = StyleSheet.create({
    movieImage: {
        width: 100,
        height: 150,
        resizeMode: "contain",
        margin: 5
    },
    moviesTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    title: {
        color: "white",
        textAlign: "center"
    },
    movieInfo: {
        margin: 10,
    },
    characterName: {
        color: "gray",
        textAlign: "center"
    },
    movieTitle: {
        width: 100
    }
})

export default SimilarMovies;