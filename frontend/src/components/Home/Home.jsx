import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";
import axios from "axios";

const Home = () => {
  const { getUser, isAuthenticated } = useGlobalContext();
  const [news, setNews] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNews();
    }
  }, [isAuthenticated]);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news/music-news');
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
      <Layout>
        <Navbar />
        <div className="tertiary_bg ml-2 px-4 py-4 home">
          <div className="my-4">
            <h1 className="text-2xl font-bold mb-4">Latest music news</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {news.map((article, index) => (
                  <div key={index} className="p-4 bg-zinc-950 rounded-lg shadow-md">
                    {article.urlToImage && (
                        <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
                    )}
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{article.description}</p>
                    <Link to={`/article/${index}`} className="text-green-400 hover:underline">
                      Read more
                    </Link>
                  </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
  );
};

export default Home;
