module.exports = (sequelize, DataTypes, Model) => {
    class SyllabusContents extends Model { }

    SyllabusContents.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        syllabusId: { type: DataTypes.STRING, allowNull: false },
        parent: { type: DataTypes.STRING, allowNull: false, defaultValue: 'modules' },
        title: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, allowNull: false },
        contents: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        children: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 0 },
        tasks: { type: DataTypes.JSON, allowNull: true },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'SyllabusContents'
    });

    return SyllabusContents;
}