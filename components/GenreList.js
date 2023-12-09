import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import GENRE_DATA from '../data/static-content-genre.json'

const GenreList = ({handleGenrePress}) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenreSelection = (genreId) => {
    // console.log(genreId)
    if (selectedGenres.includes(genreId)) {
        setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
        if(genreId == 0) {
            setSelectedGenres([0])
        } else {
            setSelectedGenres([...selectedGenres.filter((id) => id !== 0), genreId]);
        }
     
    }
    // if(selectedGenres.includes(0)) {
    //     setSelectedGenres(selectedGenres.filter((id) => id !== 0))
    // } else if(genreId == 0) {
    //     setSelectedGenres([0])
    // }
  };

useEffect(()=>{
    handleGenrePress(selectedGenres)
},[selectedGenres])



  return (
    <View style={styles.genreContainer}>
      <FlatList
        data={GENRE_DATA}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={[styles.genreButton,selectedGenres.includes(item.id) && styles.selectedGenreButton]} onPress={() => {toggleGenreSelection(item.id)}}>
              <Text style={styles.genreText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};


const styles = StyleSheet.create({
  genreContainer: {
    backgroundColor: "#242424",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  genreButton: {
    borderRadius: 8,
    backgroundColor: "#484848",
    margin: 4,
    padding: 10,
  },
  selectedGenreButton: {
    backgroundColor: 'red'
  },
  genreText: {
    color: "white"
  }
});

export default GenreList;
