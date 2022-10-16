module.exports = (sequelize, DataTypes, Model) => {
    class Syllabus extends Model { }

    Syllabus.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        courseId: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Syllabus'
    });

    return Syllabus;
}