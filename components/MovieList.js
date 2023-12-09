// MovieList.js
import React, { useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import MovieItem from './MovieItem';

const MovieList = ({ moviedata, onScroll, handleEndReached, sectionListRef }) => {

  return (
    <SectionList
      ref={sectionListRef}
      sections={moviedata}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index, section }) => (
        <MovieItem item={item} index={index} section={section} />
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.title}>{section.title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      onEndReached={handleEndReached}
      onScroll={onScroll}
      ListEmptyComponent={() => {
        return (
          <View>
            <Text style={{color: "white"}}>No Movies available</Text>
          </View>
        );
      }
    }
    />

  );
};

const styles = {
  title: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 20,
    margin: 5
    
  },
};

export default MovieList;
