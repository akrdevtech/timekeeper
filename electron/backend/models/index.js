const dbConfig = require('../configs/dbConfig');
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const studentsModel = require('./students');
const attendancesModel = require('./attendances');
const coursesModel = require('./courses');
const loggerUtil = require('../utils/logger');

const logger = loggerUtil("DB Initializer")

const { DB, DIALECT, HOST, USER, PASSWORD } = dbConfig;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    dialect: DIALECT,
    host: HOST,
});


sequelize.authenticate()
    .then(() => logger.success("a0ff8fce-31ea-11ed-a261-0242ac120002", 0, `Connected to ${DB}`))
    .catch((err) => logger.error("a77ce900-31ea-11ed-a261-0242ac120002", 0, `DB authentication error : ${err}`));

const Students = studentsModel(sequelize, DataTypes, Model);
const Attendances = attendancesModel(sequelize, DataTypes, Model);
const Courses = coursesModel(sequelize, DataTypes, Model);

const db = {
    Op,
    sequelize,
    Sequelize,
    DataTypes,
    collections: {
        Students,
        Attendances,
        Courses
    }
}

db.sequelize.sync({ force: false })
    .then(() => logger.success("43a61d98-31ea-11ed-a261-0242ac120002", 0, "DB Synced"))
    .catch((err) => logger.error("967a7866-31ea-11ed-a261-0242ac120002", 0, `DB sync error : ${err}`));

module.exports = { db }


