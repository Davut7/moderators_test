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

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  qrcodePath: {
    type: DataTypes.TEXT,
    allowNull: true,
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

  status: {
    type: DataTypes.ENUM,
    values: ['verify', 'verified', 'unverified'],
    defaultValue: 'verify',
  },
});

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  moderatorId: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  adminId: {
    type: DataTypes.UUID,
    allowNull: true,
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

Admin.hasOne(Token, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Token.belongsTo(Admin, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// (async () => {
//   await sequelize.sync({ force: true });
//   console.log('All models were synchronized successfully.');
// })();

export { Moderator, Token, Application, Admin, Users };
