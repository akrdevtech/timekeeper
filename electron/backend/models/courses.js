module.exports = (sequelize, DataTypes, Model) => {
    class Courses extends Model { }

    Courses.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        courseId: { type: DataTypes.STRING, allowNull: false, unique: true },
        courseName: { type: DataTypes.STRING, allowNull: false },
        duration: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 0 },
        fee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
        totalCredits: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
        minCredits: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
        syllabus: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: false },
        studentsAttending: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 0 },
        studentsGraduated: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 0 },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Courses'
    });

    return Courses;
}