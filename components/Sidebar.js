import React, { useState,useEffect } from 'react'
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LoginIcon
} from '@heroicons/react/outline'
import {signOut,useSession} from 'next-auth/react';
import {useRecoilState} from 'recoil'
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playlistAtom';


function Sidebar  () {
    const spotifyApi = useSpotify()
    const {data:session,status} =useSession();
    const [playlists, setPlaylist] = useState([]);
    const [playlistId,setPlayistId] = useRecoilState(playlistIdState)
    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data)=> {
                setPlaylist(data.body.items )
            })
        }
        
    }, [session,spotifyApi])
    
    // console.log('Playlist Selected',playlistId )
  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] hidden md:inline-flex lg:max-w-[15rem] pb-36'> 
        <div className='space-y-4'>
       
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className="w-5 h-5" /> 
                <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <SearchIcon className="w-5 h-5" /> 
                <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <LibraryIcon className="w-5 h-5" /> 
                <p>Library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>
            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className="w-5 h-5" /> 
                <p>Create Playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className="w-5 h-5" /> 
                <p>Liked Songs</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <RssIcon className="w-5 h-5" /> 
                <p>Your Episodes</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>
            {/* Playlist .. */}
            {playlists.map((playlist)=> (
                <p key={playlist.id} onClick={()=> setPlayistId(playlist.id)} className='cursor-pointer hover:text-white'>
                {playlist.name}
            </p>
            ))}
            
        </div>
    </div>
  )
}

export default  Sidebar