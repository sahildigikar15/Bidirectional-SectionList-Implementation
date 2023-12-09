import { View, Text, FlatList, Image, StyleSheet } from "react-native"; 
import { GETMOVIEDETAILS } from "../utils/constants";
import { useEffect, useState } from "react";
import { API_KEY } from 'react-native-dotenv'

const MovieCast = ({movieId}) => {
    const [castInfo, setCastInfo] = useState({})

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async() => {
        const castData = await fetch(GETMOVIEDETAILS + `${movieId}/credits?api_key=${API_KEY}`);
        const castInfo = await castData.json();
        setCastInfo(castInfo);
    }
    return (
      <>
        <Text style={styles.castTitle}>Top Cast ›</Text>
        <FlatList
          data={castInfo.cast}
          renderItem={({ item }) => (
            <View style={styles.castProfile}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                }}
                style={styles.castImage}
              />
              <View style={styles.castOriginal}>
                <Text style={styles.castName}>{item.original_name}</Text>
                <Text style={styles.characterName}>
                  {item.character.replace("(voice)", "")}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </>
    );
}

const styles = StyleSheet.create({
    castImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: "contain",
        margin: 5
    },
    castTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        // margin: 10
    },
    castName: {
        color: "white",
        textAlign: "center"
    },
    castProfile: {
        margin: 10,
    },
    characterName: {
        color: "gray",
        textAlign: "center"
    },
    castOriginal: {
        width: 100
    }
})

export default MovieCast;


// {
//     "adult": false,
//     "gender": 1,
//     "id": 1172108,
//     "known_for_department": "Acting",
//     "name": "Mckenna Grace",
//     "original_name": "Mckenna Grace",
//     "popularity": 49.149,
//     "profile_path": "/e8pnblWxirhG54tlNTQyXNjXQd4.jpg",
//     "cast_id": 21,
//     "character": "Skye (voice)",
//     "credit_id": "63d17ddea410c81215b6259c",
//     "order": 0
//   },