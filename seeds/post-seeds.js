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
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;