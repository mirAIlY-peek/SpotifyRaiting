import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Card from "../Card/Card";
import axios from "axios";

const Search = () => {
    const { filteredSongs, setFilteredSongs } = useGlobalContext();
    const [query, setQuery] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/spotify/token");
                console.log("Token response: ", response.data);
                setToken(response.data.access_token);
            } catch (error) {
                console.error("Error getting token: ", error);
            }
        };

        getToken();
    }, []);

    const filterSongs = async (e) => {
        const value = e.target.value;
        setQuery(value); // Обновление состояния query
        if (value === "") {
            setFilteredSongs([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/search/spotify?q=${value}&token=${token}`);
            console.log("Filtered songs response: ", response.data);
            setFilteredSongs(response.data.tracks.items);
        } catch (error) {
            console.error("Error searching songs: ", error);
        }
    };

    return (
        <Layout>
            <Navbar />
            <div className="tertiary_bg mx-4 px-4 py-4 home">
                <div className="flex justify-between mb-4 pt-4 items-center">
                    <span className="text-xl font-bold hover:underline cursor-pointer">
                        you want to turn something on?
                    </span>
                </div>
                <div>
                    <input
                        type="text"
                        value={query}
                        onChange={filterSongs}
                        placeholder="Search for songs or artist"
                        className="w-10/12 p-2 mb-4 text-black rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
                {filteredSongs?.length <= 0 && (
                    <div className="grid gap-6 grid-cols-5">
                        <div className="col-span-1">
                            <CategoryCard
                                title={"Live Events"}
                                img={"/assets/stickerPack1.png"}
                                color={"bg-purple-500"}
                            />
                        </div>
                        <div className="col-span-1">
                            <CategoryCard
                                title={"Made For You"}
                                img={"/assets/stickerPack1.png"}
                                color={"bg-red-500"}
                            />
                        </div>
                        <div className="col-span-1">
                            <CategoryCard
                                title={"New Releases"}
                                img={"/assets/stickerPack1.png"}
                                color={"bg-orange-500"}
                            />
                        </div>
                        <div className="col-span-1">
                            <CategoryCard
                                title={"Live Events"}
                                img={"/assets/stickerPack1.png"}
                                color={"bg-purple-500"}
                            />
                        </div>
                        <div className="col-span-1">
                            <CategoryCard
                                title={"Live Events"}
                                img={"/assets/stickerPack1.png"}
                                color={"bg-purple-500"}
                            />
                        </div>
                    </div>
                )}
                {filteredSongs?.length > 0 && (
                    <div className="grid gap-6 grid-cols-5">
                        {filteredSongs.map((song) => (
                            <Card key={song.id} song={song} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

const CategoryCard = ({ title, img, color }) => {
    return (
        <div className={`p-4 rounded-lg w-full ${color} relative overflow-hidden h-56`}>
            <span className="text-xl font-semibold mt-2">{title}</span>
            <img
                src={img}
                alt=""
                className="w-1/2 h-1/2 absolute bottom-0 -right-8 rotate-45 object-cover"
            />
        </div>
    );
};

export default Search;
