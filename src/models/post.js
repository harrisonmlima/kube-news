const sequelize = require('sequelize');

const DB_DATABASE = process.env.DB_DATABASE || "postgresdb";
const DB_USERNAME = process.env.DB_USERNAME || "postgresuser";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgrespwd";
const DB_HOST = process.env.DB_HOST || "postgresdb.cpjssweqhi7y.us-east-1.rds.amazonaws.com";

const seque = new sequelize.Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    }
  });

class Post extends sequelize.Model {
  
  save() {
    
    console.log('Entrou')
    super.save();
  }
}

Post.init({
  title: {
    type: sequelize.DataTypes.STRING,
    require: true
  },
  summary: {
    type: sequelize.DataTypes.STRING,
    require: true
  },
  publishDate: {
    type: sequelize.DataTypes.DATEONLY,
    require: true
  },
  content: {
    type: sequelize.DataTypes.STRING,
    require: true
  },
}, {
  sequelize: seque, // We need to pass the connection instance
  modelName: 'Post' // We need to choose the model name
})

exports.initDatabase = () => {
    seque.sync({ alter: true })
}

exports.Post = Post;

