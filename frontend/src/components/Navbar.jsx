import React ,{useState}from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/navbar.css'


function Navbar() {

  const [query,setQuery]=useState('');
  const [result,setResult]=useState([]);
  const navigate=useNavigate();

  const linkClicked= ({to})=>{
    setQuery('');
    navigate(to);
    setResult([]);
  }

  const handleSearch = async(e)=>{
    setQuery(e.target.value);
    if(e.target.value.length > 2){
      const response= await axios.get(`http://localhost:5000/api/blog/search?title=${e.target.value}`);
      setResult(response.data);
    }else{
      setResult([]);
    }
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
      <Link to={`/`} className="navbar-brand">Blogger</Link>
      <div className="search-box-container">
      <input className="form-control" type="text" value={query} onChange={handleSearch} placeholder="Type to search"/>
      <ul className="search-result">
       <li> {result.map(blog=>(
           <Link onClick={linkClicked} key={blog._id} to={`/blogs/${blog._id}`} className="nav-link">
           {blog.title}
         </Link>
        ))}</li>
      </ul>
      </div>

      </div>
    </nav>
  );
}

export default Navbar;
