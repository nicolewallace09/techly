const User = require('./User');
const Post = require('./Post');
const Like = require('./Like');
const Comment = require('./Comment');

// create associations - user can make many posts 
User.hasMany(Post, {
    foreignKey: 'user_id'
}); 

// A post can only belong to one user 
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// total of how many votes a user create
User.belongsToMany(Post, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'user_id'
});

// see all the posts user voted on 
Post.belongsToMany(User, {
    through: Like, 
    as: 'liked_posts',
    foreignKey: 'post_id'
}); 

// connected vote to user
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// connected vote to post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
}); 

// connected user to vote
User.hasMany(Like, {
    foreignKey: 'user_id'
}); 

// connected post to vote 
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