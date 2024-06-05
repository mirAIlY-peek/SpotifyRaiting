import React from "react";
import {FaPlay } from "react-icons/fa";
const Card = ({ song }) => {

    return (
        <div className="card col-span-1 p-4 rounded-lg">
            <div className="relative">
                <img
                    src={song.album.images[0]?.url}
                    className="h-[10rem] w-full object-cover rounded-lg"
                    alt={song.name}
                />

                    <button
                        className="flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3"
                    >
                        <FaPlay className="text-black text-xl" />
                    </button>

            </div>
            <h3 className="text-sm font-semibold my-2">{song.name}</h3>
        </div>
    );
};

export default Card;
