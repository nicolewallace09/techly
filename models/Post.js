const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
    //based on the post model and not an instance method
    static upvote(body, models) {
        return models.Like.create({
          user_id: body.user_id,
          post_id: body.post_id
        }).then(() => {
          return Post.findOne({
            where: {
              id: body.post_id
            },
            attributes: [
              'id',
              'post_text',
              'title',
              'created_at',
              [
                sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'),
                'like_count'
              ]
            ]
          });
        });
    }
}


// create fields/columns for Post model
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 150]
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  module.exports = Post;