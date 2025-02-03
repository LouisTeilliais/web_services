const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306,
      logging: false,
    }
);

// Tester la connexion
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion réussie à la base de données MySQL !');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
})();

module.exports = sequelize;