module.exports = (sequelize, DataTypes, Model) => {
    class Enrollments extends Model { }

    Enrollments.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        courseId: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.NUMBER, allowNull: false },
        month: { type: DataTypes.NUMBER, allowNull: false },
        enrolled: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 0 },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Enrollments'
    });

    return Enrollments;
}