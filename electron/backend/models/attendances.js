module.exports = (sequelize, DataTypes, Model) => {
    class Attendances extends Model { }

    Attendances.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        studentId: { type: DataTypes.UUID, allowNull: false },
        clockedInAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        clockedOutAt: { type: DataTypes.DATE, allowNull: true },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Attendances'
    });

    return Attendances;
}