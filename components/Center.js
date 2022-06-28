/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import { data } from "autoprefixer";
import Songs from "./Songs";
import {signOut} from 'next-auth/react';

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-pink-500",
];
function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop(colors));
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Error", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi, playlistId]);
  

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 ">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white font-bold" onClick={signOut}>
          <img
            className="rounded-full max-w-[40px] "
            src={session?.user?.image}
            alt=""
          />
          <p className="">{session?.user?.name}</p>
          <ChevronDownIcon className="h-5 w-5  items-center" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div className="flex flex-col">
          <div className="font-bold uppercase">{playlist?.type}</div>
          <div className="text-6xl font-bold">{playlist?.name}</div>
          <div className="mt-5 flex space-x-2"><a href="#">{playlist?.owner?.display_name}</a>
           <p>{playlist?.tracks?.total} lagu</p>
          </div>
        </div>
      </section>
    <Songs/>
    </div>
  );
}

export default Center;
