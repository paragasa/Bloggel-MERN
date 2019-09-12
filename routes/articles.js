const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator')
const Post = require('../database/models/Post.js')
const User = require('../database/models/User')


//@route GET /articles
//@desc   
//@access
//pagination
router.get('/',  async(req, res)=>{
    let perPage = 6
    , page = parseInt(req.query.page)|| 1
    try {
         const [ results, total ] = await Promise.all([
            Post.find()
            .populate('author')
            .limit(perPage)
            .skip(perPage * (page-1))
            .sort({
                createdAt: -1
            })
            ,
            Post.countDocuments()
          ]);
        
          const pageCount = Math.ceil(total / perPage);
          let pageup=page+1,pagedown=page-1;
          const prev_page=  page > 1 ? `http://localhost:4000/api/articles?page=${pagedown}`:null
          const next_page=  page < pageCount?  `http://localhost:4000/api/articles?page=${pageup}`:null 

          const articles = {
            "total": total,
            "now": req.query.page,
            "per_page": perPage,
            "current_page": page,
            "last_page": pageCount,
            "prev_page_url":  prev_page,
            "next_page_url": next_page,
            "data": results
          }
          res.status(200).send(articles)
    } catch (error) {
        return res.status(500).send("Server Error")
    }  
})

//@route pot api/articles
//@desc  post to articles
//@access   private

router.post('/', 
check('title', 'Title is Required').not().isEmpty(),
check('content', 'Content is Required').not().isEmpty(),       
check('imageUrl', 'ImageUrl is Required').not().isEmpty(),
auth , async(req, res)=>{
    const errors = []
    try {
  
        const valid_errors = validationResult(req)
        
        if(valid_errors.errors.length){

            errors = errors + valid_errors.array()
            return res.status(400).send(errors)       
        }  
        
        const { title, content, imageUrl } = req.body
        const author = await User.findById(req.user.id)
        
        const post = new Post({
            title,
            content,
            imageUrl,
            author,
            
        })

        await post.save();
        return res.status(200).send("Post saved")

    } catch (error) {
        errors.push({message: 'Server Errror'})
        return res.status(500).send(errors)
    }
})

router.put('/:id',
check('title', 'Title is Required').not().isEmpty(),
check('content', 'Content is Required').not().isEmpty(),       
check('imageUrl', 'ImageUrl is Required').not().isEmpty(),
auth, async(req , res)=>{ 
    // console.log(req.params);
    const errors = []
    try {
        const valid_errors = validationResult(req)
        
        if(valid_errors.errors.length){

            errors = errors + valid_errors.array()
            return res.status(400).send(errors)       
        }  
        const { title, content, imageUrl } = req.body
        
        const author = await User.findById(req.user.id)
        
        if(!author){
            return res.status(401).send({errors:['Invalid credential']})
        }
        await  Post.findByIdAndUpdate(
            //Filter 
            req.params.id
            //Replace
            ,{
            title,
            content,
            imageUrl,
            updatedAt: new Date()
        })
        
      
        return res.status(200).send("Post saved")

    } catch (error) {
        errors.push({message: 'Server Errror'})
        return res.status(500).send(errors)
    }
   
})


router.delete('/:id',auth, async(req , res)=>{
    if(req.params.id){
        try {
            await Post.findByIdAndDelete(req.params.id)
            return res.status(200).send('Post deleted')
        } catch (error) {
            
            return res.status(500).send({message: error})
        }
    }else{
        return res.status(400).send('Bad Request')
    }
    
    
})


//@route get api/article
//@desc  gets users artilces
//@access   private

router.get('/user', auth,  async(req , res)=>{
 
    const errors = []
    try {
        let perPage = 6
        , page = parseInt(req.query.page)|| 1

        const [ results, total ] = await Promise.all([
            Post.find({author: req.user.id,})
            //.populate('author')
            .limit(perPage)
            .skip(perPage * (page-1))
            .sort({
                createdAt: -1
            })
            ,
            Post.countDocuments()
            ]);
     
            
            const pageCount = Math.ceil(total / perPage);
            let pageup=page+1,pagedown=page-1;
            const prev_page=  page > 1 ? `http://localhost:4000/api/articles?page=${pagedown}`:null
            const next_page=  page < pageCount?  `http://localhost:4000/api/articles?page=${pageup}`:null 

            const articles = {
                "total": total,
                "now": req.query.page,
                "per_page": perPage,
                "current_page": page,
                "last_page": pageCount,
                "prev_page_url":  prev_page,
                "next_page_url": next_page,
                "data": results
            }
            res.status(200).send(articles)
            } catch (error) {
                errors.push({message: 'Server Errror'})
                return res.status(500).send(errors)
            }  
})




module.exports = router;