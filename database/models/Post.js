const mongoose = require('mongoose') 
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const PostSchema = new mongoose.Schema({
    title: {
            type: String,
            require:[true, 'Please provide a title']
        },
   
    content: {
            type: String,
            require:[true, 'Please provide content']
        },
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require:[true]
    },
    slug: { type: String, slug: ["title", "author"], slug_padding_size: 4,  unique: true },
    imageUrl: {
        type: String,
        require:[true, 'Please provide ImageUrl']
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post;