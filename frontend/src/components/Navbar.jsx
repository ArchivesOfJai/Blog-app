import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import "../css/navbar.css";
import icon from "../assets/blogger.png";

function Navbar() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const isSmallWindow = useMediaQuery({ query: `(max-width: 575px)` });
  const [isFind, setFind] = useState(true);


  const linkClicked = ({ to }) => {
    setQuery("");
    navigate(to);
    setResult([]);
  };

  const handleToggle = () => {
    if(!isSmallWindow &&(query.length==0)){
      return;
    }
    if(!isSmallWindow && (query.length>=1)){
      setQuery('');
      setResult([]);
      return;
    }
    isFind ? setFind(false) : setFind(true);
    if (!isFind) {
      setQuery("");
      setResult([]);
    }
  };

  useEffect(() => {
    setFind(isSmallWindow ? false : true);
  }, [isSmallWindow]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await axios.get(
        `http://localhost:5000/api/blog/search?title=${e.target.value}`
      );
      setResult(response.data);
    } else {
      setResult([]);
    }
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link to={`/`} className="navbar-brand">
          <img src={icon} className="nav-icon mx-1" alt="Blogger" />
          Blogger
        </Link>
        {(isSmallWindow && !isFind)&&(
          <button
            className="navbar-toggler"
            onClick={handleToggle}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        )}

        {isFind && (
          <div className="search-box-container ms-auto me-0" style={(isFind && isSmallWindow)?{top:"80px"}:null}>
            <input
              className="search-box"
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Type to search"
            />
            <ul className="search-result">
            {result.length>=1 &&
                <li>
                {result.map((blog) => (
                  <Link
                    onClick={linkClicked}
                    key={blog._id}
                    to={`/blogs/${blog._id}`}
                    className="nav-link"
                  >
                    {blog.title}
                  </Link>
                ))}
              </li>
              }
            </ul>
            <button
            onClick={handleToggle}
          type="button"
          className="btn-close close-search"
        ></button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
