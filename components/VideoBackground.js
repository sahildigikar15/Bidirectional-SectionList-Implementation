import React, {useEffect, useState} from 'react';
import YoutubePlayer from "react-native-youtube-iframe";
import {ScrollView} from 'react-native'
import { GETMOVIEDETAILS } from '../utils/constants';
import { API_KEY } from 'react-native-dotenv'

const VideoBackground = ({movieId, isVideoError}) => {
  const [videoKey , setVideoKey] = useState("")

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () => {
    const movieVideos = await fetch(GETMOVIEDETAILS + `${movieId}/videos?api_key=${API_KEY}`)
    const videoInfo = await movieVideos.json();
    const trailerVideos = videoInfo?.results.filter((video)=>video.type == "Trailer")
    setVideoKey(videoInfo?.results[0]?.key || trailerVideos);
    
  }

  return (
    <>
    <ScrollView>
    <YoutubePlayer
        height={220}
        width="auto"
        onError={(e)=>isVideoError(e)}
        videoId={videoKey}
        play={true}
        mute={true}
      />
      </ScrollView>
    </>
  );
};

export default VideoBackground;