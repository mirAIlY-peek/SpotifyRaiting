import React, { useEffect, useState } from "react";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
// import Signup from "./Signup";
import "./Sidebar.css";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  // const [playlists, setPlaylists] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { articleId } = useParams();
  // const getPlaylists = async () => {
  //   const res = await fetch("http://localhost:5000/api/playlist/", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //
  //   let d = await res.json();
  //   console.log(d);
  //   setPlaylists(d.playlists);
  // };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/${articleId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    // getPlaylists();
    fetchReviews();
  }, []);


  return (
    <div className="w-1/4 fixed left-0 mt-2 top-0 sidebar ">
      <div className="nav secondary_bg rounded-lg p-6">
        <Link to={"/"} className="flex items-center gap-6">
          <BiSolidHome className="font-bold text-2xl" />
          <span className="text-lg">Home</span>
        </Link>
        <Link to={"/search"} className="flex mt-4 items-center gap-6">
          <FiSearch className="font-bold text-2xl" />
          <span className="text-lg">Search</span>
        </Link>
      </div>
      <div className="mt-2 secondary_bg rounded-lg px-2 py-2">
          {/*{reviews.map((review, index) => (*/}
          {/*    <div key={index} className="p-4 bg-zinc-950 rounded-lg shadow-md mb-4">*/}
          {/*      <h3 className="text-lg font-bold mb-2">{review.name}</h3>*/}
          {/*      <p className="text-sm text-gray-400 mb-2">{review.comment}</p>*/}
          {/*      <p className="text-sm text-gray-400">Rating: {review.rating}</p>*/}
          {/*      <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleString()}</p>*/}
          {/*    </div>*/}
          {/*))}*/}
      </div>
      <div className="mt-4 px-4 flex gap-4 flex-wrap">
        <a className="text-xs text-gray-300 mx-4" href="#">
          Legal
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Privacy Center
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Privacy Policy
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Cookies
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          About Ads
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Accessibility
        </a>
      </div>
      <button className="mx-4 mt-12 text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center  text-white ">
        <TbWorld />
        <span className="text-white font-bold">English</span>
      </button>

      {/* <Signup /> */}
    </div>
  );
};

export default Sidebar;
