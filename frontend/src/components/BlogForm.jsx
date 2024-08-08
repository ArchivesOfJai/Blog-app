import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import "../css/blogForm.css";

const BlogForm = ({ disableForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/blogs", formData)
      .then((response) => {
        // console.log(response.data);
        setFormData({ title: "", content: "", imageUrl: "" });
        disableForm();
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="blog-form">
        <div className="form-body">
        <button
          type="button"
          className="btn-close"
          onClick={disableForm}
        ></button>
        <div className="row mb-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="form-control input-data"
          />
        </div>
        <div className="row mb-3">
          <TextareaAutosize
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Your content goes here"
            className="form-control input-data"
          />
        </div>
        <div className="row mb-3">
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="enter the URL of the image"
            className="form-control input-data"
          />
        </div>
        <div className=" submit-btn-div">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
