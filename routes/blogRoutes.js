const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
} = require("../controllers/blogControlller");

const jwt = require('jsonwebtoken');

// const {authenticateToken} = require('../controllers/userContoller')

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = user;
    next();
  });
};

//router object
const router = express.Router();

//routes
// GET || all blogs 
router.get("/all-blog", getAllBlogsController);

//POST || create blog
router.post("/create-blog", authenticateToken,createBlogController);

//PUT || update blog
router.put("/update-blog/:id", authenticateToken,updateBlogController);

//GET || SIngle Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blog
router.delete("/delete-blog/:id", authenticateToken,deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", authenticateToken,userBlogControlller);

module.exports = router;