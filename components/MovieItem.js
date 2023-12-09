import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GETMOVIEIMAGE } from '../utils/constants';

const { width, height } = Dimensions.get('window');

const MovieItem = ({ item, index, section}) => {
    const navigation = useNavigation()
    if (index % 2 === 0) {
      const nextItem = section.data[index + 1];

      return (
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate("Details", {
            movieId: item.id
          })}>
          <View style={[styles.card, { width: width / 2 - 25 }]}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.image}
            />
            <Text style={[styles.text, styles.cardText]}>
              {item.title}
            </Text>
            <Text style={[styles.text, styles.ratingText]}>
              ⭐ {item.vote_average + "/" + 10}
            </Text>
          </View>
          </TouchableOpacity>

          {nextItem && (
             <TouchableOpacity onPress={()=>{navigation.navigate("Details", {
              movieId: nextItem.id
             })}}>
            <View style={[styles.card, { width: width / 2 - 25 }]}>
              <Image
                source={{
                  uri: `${GETMOVIEIMAGE}${nextItem.poster_path}`,
                }}
                style={styles.image}
              />
              <Text style={[styles.text, styles.cardText]}>
                {nextItem.title}
              </Text>
              <Text style={[styles.text, styles.ratingText]}>
                ⭐ {nextItem.vote_average + "/" + 10}
              </Text>
            </View>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return null;
  }

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  cardText: {
    marginTop: 5,
    paddingBottom: 2,
  },
  ratingText: {
    marginTop: 2,
    paddingBottom: 2,
  },
  image: {
    margin: 5,
    width: '100%',
    height: 210,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default MovieItem;
