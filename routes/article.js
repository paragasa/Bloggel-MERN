const express = require('express');
const router = express.Router();


const Post = require('../database/models/Post.js')



//@route get api/article
//@desc  get a single article
//@access   public
router.get('/:slug',

 async(req, res)=>{

    try {
        const article = await Post.findOne({slug: `${req.params.slug}`}).populate('author')
        return res.status(200).send(article)
    } catch (error) {
        return res.send(500).send("Server Error")
    }  
        
})


module.exports = router;