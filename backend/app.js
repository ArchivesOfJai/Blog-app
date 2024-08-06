// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Blog model
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Fetch a single blog post by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get(`/api/blog/search`,async(req,res)=>{
try{
  const {title}= req.query;
  if(!title){
    return res.json([]);
  }
  const blog= await Blog.find({title:new RegExp(title,'i')});
  res.json(blog)
}catch(err){
  res.status(500).json({message: err.message});
}
});




app.post('/api/blogs', async (req, res) => {
  const blogData = req.body;

  const blog = new Blog(blogData);

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      res.json({ message: 'Blog post deleted' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
