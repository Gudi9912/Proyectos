const { Sequelize, DataTypes } =require("sequelize")
const path = require('path');
const dbPath = path.join(__dirname, '..', '..', '.data', 'Pokemon.db');
//const sequelize = new Sequelize("sqlite:" + "../.data/Pokemon.db")
const sequelize = new Sequelize({
    dialect: "sqlite",
   storage: dbPath
})

const Kanto = sequelize.define(
    "Kanto",
    {
        IdPokedex: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EvolutionStage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FirstType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SecondType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Special: {
            type: DataTypes.STRING,
            allowNull: true
        },
        EvolutionMethod: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "Kanto",
        timestamps: false
    }
)

const Filters = sequelize.define(
    "Filters",
    {
        IdFilter: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FilterX1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FilterX2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FilterX3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FilterY1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        FilterY2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        FilterY3: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "Filters",
        timestamps: false
    }
)

module.exports = {
    sequelize,
    Kanto,
    Filters
}