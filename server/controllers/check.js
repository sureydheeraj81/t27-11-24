const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', etc., based on your DB
});

// Define your model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
  },
  date_created: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'your_table_name',
  timestamps: false,
});

// API to count records by month
app.get('/count-by-month', async (req, res) => {
  try {
    const data = await sequelize.query(
      `SELECT 
         MONTH(date_created) AS month, 
         COUNT(*) AS count 
       FROM your_table_name 
       GROUP BY MONTH(date_created)
       ORDER BY MONTH(date_created)`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Format the response with month names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const formattedData = data.map((entry) => ({
      month: monthNames[entry.month - 1],
      count: entry.count,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

the get api is 

"const Registration = require('../models/registrationFormModel');

exports.dataChart= async (req, res) => {
    try {
      const data = await Registration.query(
        `SELECT 
           MONTH(date_created) AS month, 
           COUNT(*) AS count 
         FROM your_table_name 
         GROUP BY MONTH(date_created)
         ORDER BY MONTH(date_created)`,
        { type: Registration.QueryTypes.SELECT }
      );
  
      // Format the response with month names
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
  
      const formattedData = data.map((entry) => ({
        month: monthNames[entry.month - 1],
        count: entry.count,
      }));
  
      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }"
  and the model is 
  "
  const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

const registerModel = sequelize.define('userApp', {
  sno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile_no: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  application_no: {
    type: DataTypes.STRING,
    allowNull: true,
    // unique: true,
  },
  usertype: {
    type: DataTypes.ENUM('Govt User', 'Research/Academic User', 'Private User'),
    allowNull: true,
  },
  photo_id_type: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  usertype_doc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idtype_doc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  upload_annexure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  region: {
    type: DataTypes.ENUM('region-1', 'region-2'),
    allowNull: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_activated: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    // allowNull: true,
    defaultValue: 'Active',
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: true,
    // defaultValue: false,
  },
  date_modified: {
    type: DataTypes.DATE,
    // defaultValue: DataTypes.NOW,
  },
  activated_by: {
    type: DataTypes.STRING,
  },
  modified_by: {
    type: DataTypes.STRING,
  },
  deleted_by: {
    type: DataTypes.STRING,
  },
  deleted_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_rejected: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    // allowNull: true,
    defaultValue: 'Pending'

  },

  rejected_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rejected_reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_other: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_category_other: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emptype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'cors_registration_form',
  timestamps: false,

});


module.exports = registerModel;
  " correct this api
