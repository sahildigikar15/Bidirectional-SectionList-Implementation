import { View, Image, Text, StyleSheet, Dimensions, ScrollView} from "react-native";
import MovieCast from "./MovieCast";
import SimilarMovies from "./SimilarMovies";
import VideoBackground from "./VideoBackground";
import { useRef, useState } from "react";

const movieInfo = ({movieDetails, movieId}) => {
    const [videoError,setVideoError] = useState(false)

    function toHoursAndMinutes(totalMinutes) {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        return `${hours}h ${minutes}m`
    }
    const isVideoError = (e) => {
        switch(e) {
            case "video_not_found":
                setVideoError(true)
                break
            case "embed_not_allowed":
                setVideoError(true)
                break
            case "HTML5_error":
                setVideoError(true)
                break
            default:
                setVideoError(false)  
        }
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#121212'}}>
            <View style={styles.movieInfoContainer}>
                { videoError && <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`,
                    }}
                    style={styles.movieImage}
                    />
                }
                {!videoError && <VideoBackground movieId={movieId} isVideoError={isVideoError}/>}
                <Text style={styles.movieTitle}>{movieDetails.title} {movieDetails.release_date && "(" + movieDetails.release_date?.slice(0,4) + ")"}</Text>
                <Text style={styles.movieTagline}>{movieDetails.tagline}</Text>
                <Text style={styles.genres}>
                    { movieDetails?.genres?.map(genre => genre.name).join(' • ')}
                </Text>
                {/* <Text style={styles.movieHeadings}>Storyline</Text> */}
                <Text style={styles.movieOverview}>{movieDetails.overview}</Text>
                    {/* <Text style={{color: "white"}}>{movieId}</Text> */}
                    <Text style={{margin: 10, color: "white"}}>⭐ {movieDetails?.vote_average?.toFixed(1) + "/10"}  •  {toHoursAndMinutes(movieDetails.runtime)}</Text>
                <MovieCast movieId={movieId}/>
                <SimilarMovies movieId={movieId}/>
            </View>
            {/* <TouchableOpacity onPress={()=>navigation.push("Details", {
                movieId: "73723"
            })}><Text style={{color: "white"}}>Hello World</Text></TouchableOpacity> */}
        </ScrollView> 
    );
}


const styles = StyleSheet.create({
    movieInfoContainer: {
        margin: 5
    },
    movieImage: {
        width: 'auto', 
        height: 250, 
        resizeMode: "contain", 
        borderRadius: 10
    },
    movieTitle: {
        color: "white", 
        fontSize: 25, 
        fontWeight: "bold",  
        marginTop: 5,
        textAlign: "center"
    },
    movieTagline: {
        color: "gray", 
        fontSize: 15, 
        textAlign: "center"
    },
    movieHeadings: {
        color: "white",
        fontWeight: "bold"
    },
    genres: {
        fontWeight: "normal",
        color: "gray",
        textAlign: "center",
        fontSize: 16
    },
    movieOverview: {
        margin: 10,
        color: "gray"
    }
})

export default movieInfo;