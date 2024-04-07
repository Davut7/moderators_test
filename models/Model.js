import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';
import { v4 as uuidv4 } from 'uuid';

const Moderator = sequelize.define('Moderator', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  verifyLevel: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moderatorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  checkLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  denialReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Moderator.hasOne(Token, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Token.belongsTo(Moderator, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// (async () => {
//   await sequelize.sync({ force: true });
//   console.log('All models were synchronized successfully.');
// })();

export { Moderator, Token, Application };
