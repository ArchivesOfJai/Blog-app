// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BlogForm from './components/BlogForm';
// import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Home from './Home';

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <h1>Blog Management</h1>
    //     <Routes>

    //       <Route path="/home" element={<BlogList />} />
    //       <Route path="/" element={<BlogList />} />
    //       <Route path="/blogs/:id" element={<BlogDetail />} />
    //       <Route path="/new" element={<BlogForm />} />
    //     </Routes>
    //   </div>
    // </Router>
    <Router>
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
