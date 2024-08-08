import React from "react";
import { Link } from "react-router-dom";
import "../css/card.css";

const cardStyle = {
  width: "17rem",
};

const Card = ({ blog, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(blog._id);
  };

  const monthName=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 my-3 p-0">
      <div className="card mx-auto text-start" style={cardStyle}>
        <img src={blog.imageUrl} alt={blog.title} className="card-img-top" />
        <div className="card-body">
          <h3>{blog.title}</h3>
          <p>{blog.content.substring(0, 50)}...</p>
          <Link to={`/blogs/${blog._id}`} className="read-more-link">
            Read More
          </Link>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="btn delete-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </button>
          <p className="creation-date">
            {`Created on: ${new Date(blog.createdAt).getDate()} ${monthName[new Date(blog.createdAt).getMonth()]},${new Date(blog.createdAt).getFullYear()}`}
        </p>
        </div>
      </div>
    </div>
    // <div className="card" style="width: 18rem;">
    //   <img src={blog.imageUrl} className="card-img-top" alt={blog.title} />
    //   <div className="card-body">
    //     <h5 className="card-title">{blog.title}</h5>
    //     <p className="card-text">{blog.content.substring(0, 100)}...</p>
    //     <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
    //       Read More
    //     </Link>
    //     <button onClick={handleDeleteClick} className="delete-button">
    //       Delete
    //     </button>
    //   </div>
    // </div>
  );
};

export default Card;
