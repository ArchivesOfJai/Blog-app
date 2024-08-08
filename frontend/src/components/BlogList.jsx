// frontend/src/components/BlogList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Card from './Card';
import "../css/blogList.css"

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blogs!', error);
      });
  }, [blogs]);

  // const handleNewBlogClick = () => {
  //   navigate('/new');
  // };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/blogs/${id}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the blog!', error);
      });
  };

  

  return (
    // <div className="blog-list-container">
    //   {/* <button onClick={handleNewBlogClick}>Create New Blog</button> */}
    //   {/* <div className="blog-cards">
    //     {blogs.map(blog => (
    //       <Card key={blog._id} blog={blog} onDelete={handleDelete} />
    //     ))}
    //   </div> */}
    // </div>
    <>
    <div className="row blog-container mx-auto mt-5 py-5">
    {blogs.map(blog => (
      <Card key={blog._id} blog={blog} onDelete={handleDelete} />
    ))}
    </div>
    
    </>
  );
};

export default BlogList;
