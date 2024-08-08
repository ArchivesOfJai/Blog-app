// frontend/src/components/BlogDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../css/blogPage.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(`/`);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the blog post!", error);
      });
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container-fluid read-blog mt-5 pt-4">
        <button
          onClick={handleGoBack}
          type="button"
          className="btn btn-outline-dark back-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fillRule="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
        <h2 className="ms-2">{blog.title}</h2>
        <div className="row">
          <div className="col-8 ms-3">
            <p>{blog.content}</p>
          </div>
          <div className="col">
            <img src={blog.imageUrl} alt={blog.title} className="" />
          </div>
        </div>
        <p className="pb-5 mb-5">
            Created on: {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
