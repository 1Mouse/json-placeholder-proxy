const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Proxy endpoint
app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    if (error.status === 404) res.status(404).json({ error: "Post not found" });
    else res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Start the server
app.listen(PORT, () => {});
