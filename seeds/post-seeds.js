const { Post } = require('../models');

const postData = [
    {
        // "title": "Life Update",
        "post_text": "I just finished my coursework at UC Berkley Coding Bootcamp!",
        "user_id": 1
    },
    {
        // "title": "Life Update",
        "post_text": "Does anyone know how to implement infinite scrolling?!",
        "user_id": 2
    },
    {
        // "title": "Life Update",
        "post_text": "Handlebars is killing me.",
        "user_id": 2
    }, 
    {
        // "title": "Life Update",
        "post_text": "Hey guys, here's a cool npm package for uploading images -  https://www.npmjs.com/package/multer",
        "user_id": 3
    }
    ,  
    {
        // "title": "Life Update",
        "post_text": "What are some good npm resources for a project?",
        "user_id": 3
    },
    {
        // "title": "Life Update",
        "post_text": "Just finished working on a search function for my project!",
        "user_id": 1
    }

]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;