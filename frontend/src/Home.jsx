import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Footer from "./components/Footer";
import "./css/blogForm.css";

function Home() {
  const [newBlog, setNewBlog] = useState(false);

  const enableForm =()=>{
    setNewBlog(true);
  }
  
  const disableForm=()=>{
    setNewBlog(false);
  }

  return (
    <>
      <Navbar />
      {newBlog ? <BlogForm disableForm={disableForm}/> : <></>}
      {newBlog ? <div className="blur-background" /> : <></>}
      <BlogList isNewBlog={newBlog} />
      {newBlog ? (
        <></>
      ) : (
      <button className="new-blog-btn" onClick={enableForm}></button>
      )}
      <Footer/>
    </>
  );
}

export default Home;
