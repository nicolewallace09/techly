const User = require('./User');
const Post = require('./Post');
const Like = require('./Like');
const Comment = require('./Comment');

// user can make many posts 
User.hasMany(Post, {
    foreignKey: 'user_id'
}); 

// post can only belong to one user 
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// see all posts that belong to a user 
User.belongsToMany(Post, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'user_id'
});

// see all the posts user liked
Post.belongsToMany(User, {
    through: Like, 
    as: 'liked_posts',
    foreignKey: 'post_id'
}); 

// connected like to user
Like.belongsTo(User, {
    foreignKey: 'user_id'
});

// connected like to post
Like.belongsTo(Post, {
    foreignKey: 'post_id'
}); 

// connected user to like
User.hasMany(Like, {
    foreignKey: 'user_id'
}); 

// connected post to like
Post.hasMany(Like, {
    foreignKey: 'post_id'
}); 

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Like, Comment };