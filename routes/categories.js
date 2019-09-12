const express = require('express');
const router = express.Router();

const Category = require('../database/models/Category')
/////////////////////////////

//@route GET /categories
//@desc  gets article categories
//@access public
router.get('/', async(req, res)=>{
    
    // const categories = {
    //     "categories": [
    //         {
    //             "id": 1,
    //             "name": "Technology",
                
    //         },
    //         {
    //             "id": 2,
    //             "name": "Buissness",
              
    //         },
    //         {
    //             "id": 3,
    //             "name": "Motivation",
              
    //         },
    //         {
    //             "id": 4,
    //             "name": "Sports",
               
    //         },
    //         {
    //             "id": 5,
    //             "name": "Personal",
                
    //         },
    //         {
    //             "id": 6,
    //             "name": "Entertainment",
              
    //         },
    //         {
    //             "id": 7,
    //             "name": "Music",
              
    //         }
    //     ]
    // }
    try {
        const categories = await Category.find({})
        if(!categories){
            return res.status(500)
        }
        res.status(200).send(categories);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
    
})


module.exports = router;