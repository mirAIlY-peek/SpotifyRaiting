import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";

const ArticleDetail = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);

    useEffect(() => {
        fetchArticle();
        fetchReviews();
    }, []);

    const fetchArticle = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news/music-news');
            setArticle(response.data[articleId]);
        } catch (error) {
            console.error("Error fetching article:", error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/reviews/${articleId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newReview = {
                articleId,
                name,
                comment,
                rating
            };
            await axios.post('http://localhost:5000/api/reviews', newReview);
            fetchReviews();
            setName("");
            setComment("");
            setRating(1);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    if (!article) return <div>Loading...</div>;

    return (
        <Layout>
            <Navbar />
            <div className="tertiary_bg ml-2 px-4 py-4 home">
                <div className="my-4">
                    <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
                    {article.urlToImage && (
                        <img src={article.urlToImage} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-4"/>
                    )}
                    <p className="text-sm text-gray-400 mb-4">{article.description}</p>
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="mb-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="p-4 bg-zinc-950 rounded-lg shadow-md mb-4">
                                <h3 className="text-lg font-bold mb-2">{review.name}</h3>
                                <p className="text-sm text-gray-400 mb-2">{review.comment}</p>
                                <p className="text-sm text-gray-400">Rating: {review.rating}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded-lg bg-zinc-950 text-white" required />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Comment</label>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 rounded-lg bg-zinc-950 text-white" required></textarea>
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-bold mb-1">Rating</label>
                            <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 rounded-lg bg-zinc-950 text-white" required>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="p-2 bg-green-400 rounded-lg text-white">Submit Review</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default ArticleDetail;
