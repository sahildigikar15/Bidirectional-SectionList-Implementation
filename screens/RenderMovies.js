// App.js
import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import MovieList from "../components/MovieList";
import GenreList from "../components/GenreList";
import { GETALLMOVIES} from "../utils/constants";
import { API_KEY } from 'react-native-dotenv'
import Spinner from "../components/Spinner";

export default function RenderMovies() {
  const [moviedata, setMovieData] = useState([]);
  const [currYear, setCurrYear] = useState(2012);
  const nextYearRef = useRef(2012);
  const prevYearRef = useRef(2012);
  const offset = useRef(0);
  const sectionListRef = useRef(null);
  const selectedGenresChanged = useRef(false);
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currYear]);

  useEffect(() => {
    setMovieData([]);
    console.log("aFTER SETMOVIE" + moviedata[0]?.data.length);
    setCurrYear(2012);
    console.log("aFTER SETYEAR" + currYear);
    prevYearRef.current = 2012;
    nextYearRef.current = 2012;
    // sectionListRef.current = null
    console.log("aFTER REFS" + prevYearRef.current);
    selectedGenresChanged.current = true;
    fetchData();

  }, [selectedGenres]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const genreIds = selectedGenres.filter((id) => id !== 0).join(",");
      console.log(
        GETALLMOVIES +
          `${currYear}&api_key=${API_KEY}` +
          `${genreIds ? "&with_genres=" + genreIds : ""}`
      );
      console.log("Current Year " + currYear);
      console.log("INSIDE FETCH");
      const lists = await fetch(
        GETALLMOVIES +
          `${currYear}&api_key=${API_KEY}` +
          `${genreIds ? "&with_genres=" + genreIds : ""}`
      );
      const newdata = await lists.json();
      console.log("NewData " + newdata);
      const modifiedData = {
        title: currYear,
        data: newdata?.results?.slice(0, 20),
      };
      // console.log(modifiedData?.data[0].genre_ids);
      // console.log("Length---" + moviedata)
      if(modifiedData?.data.length != 0) {
        if (currYear >= 2012) {
          setMovieData([...moviedata, modifiedData]);
        } else {
          setMovieData([modifiedData, ...moviedata]);
        }
      } else {
        if (nextYearRef.current < 2023) {
          nextYearRef.current += 1;
          setCurrYear(nextYearRef.current);
        } else if(nextYearRef.current >= 2023 && modifiedData?.data.length == 0 && prevYearRef.current >= 1900) {
          prevYearRef.current -=1;
          setCurrYear(prevYearRef.current);
        } 
      }
      

      if (sectionListRef.current && currYear < 2012 && !selectedGenresChanged.current) {
        const lastIndex = modifiedData?.data?.length;
        sectionListRef.current.scrollToLocation({
          animated: false,
          itemIndex: lastIndex,
          // sectionIndex: lastIndex,
          viewOffset: 0,
        });
      }

      if (
        selectedGenresChanged.current &&
        sectionListRef.current && currYear == 2012
      ) {
        // const firstIndex = modifiedData?.data?.length;
        selectedGenresChanged.current = false;
        sectionListRef.current.scrollToLocation({
          animated: false,
          itemIndex: 1,
          sectionIndex: 0,
          // viewPosition: 1,
          viewOffset: 0,
        });
      }
    } catch (e) {
      console.log("Error ....." + e);
    } finally {
      setLoading(false);
    }
  };

  const handleStartReached = () => {
    if (!loading) {
      prevYearRef.current -= 1;
      setCurrYear(prevYearRef.current);
    }
  };

  const onScroll = (event) => {
    console.log("*********In Scroll");
    let currentOffset = event?.nativeEvent?.contentOffset?.y;
    let direction =
      currentOffset > 0 && currentOffset > offset.current ? "down" : "up";
    if (direction === "up" && currentOffset == 0 && !loading) {
      console.log("Inside !!");
      handleStartReached();
    }
    offset.current = currentOffset;


  };

  const handleEndReached = () => {
    if (!loading) {
      nextYearRef.current += 1;
      nextYearRef.current <= 2023 && setCurrYear(nextYearRef.current);
    }
  };

  const handleGenrePress = (genresList) => {
    console.log(genresList + "FIRST CALL");
    selectedGenresChanged.current = true;
    setCurrYear(2012); // Reset to default year
    setMovieData([]); // Clear existing movie data
    setSelectedGenres(genresList);
  };

  // const onContentSizeChange = (contentWidth, contentHeight) => {
  //   const listHeight = sectionListRef.current?.props?.height || 0;
  //   const isScrollable = contentHeight > listHeight;

  //   // if (!isScrollable) {
  //     console.log('No scrollable content. Triggering your function...');
  //     // Call your function for no scrollable content
  //   // }
  // };

  const renderLoading = () => {
    return loading && (nextYearRef.current != 2012 || prevYearRef.current != 2012) ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  }

  // const renderHeader = () => 

  return (
    <>
      <GenreList handleGenrePress={handleGenrePress} />
      <View style={styles.container}>
        <MovieList
          moviedata={moviedata}
          fetchData={fetchData}
          onScroll={onScroll}
          handleEndReached={handleEndReached}
          sectionListRef={sectionListRef}
        />
      </View>
      <Spinner loading={loading}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    // padding: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 10,
    // paddingTop: StatusBar.currentHeight,
  },
});
