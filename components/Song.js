/* eslint-disable @next/next/no-img-element */
import React from 'react'
import useSpotify from '../hooks/useSpotify'
import {currentTrackIdState, isPlayingState} from '../atoms/songAtom'
import { millisTominutesAndSeconds } from '../lib/time';
import {useRecoilState} from 'recoil'
function Song({order, track}) {
    const spotifyAPi = useSpotify();
    const duration = millisTominutesAndSeconds(track.track.duration_ms)
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id)
        setIsPlaying(true);
        spotifyAPi.play({
            uris: [track.track.uri]
        })
    } 


   
  return (
 <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer' onClick={playSong}>
    <div className='flex space-x-3 items-center space-y-4'>
        <p>
            {order+1}
        </p>
        <img className='w-10 h-10' src={track.track.album.images[0].url} alt=""/>
        <div>
            <p className='w-36 lg:w-64 text-white truncate'>
                {track.track.name}
            </p>
            <p className='w-40'>
                {track.track.artists[0].name}
            </p>
        </div>
    </div>
    <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline'>{track.track.album.name}</p>
        <p className=''>{duration}</p>
    </div>
 </div>
  )
}

export default Song