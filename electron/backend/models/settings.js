module.exports = (sequelize, DataTypes, Model) => {
    class Settings extends Model { }

    Settings.init({
        id: { type: DataTypes.STRING, primaryKey: true },
        profile: { type: DataTypes.STRING, allowNull: false},
        key: { type: DataTypes.STRING, allowNull: false},
        value: { type: DataTypes.STRING, allowNull: true },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Settings'
    });

    return Settings;
}