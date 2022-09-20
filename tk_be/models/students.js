module.exports = (sequelize, DataTypes, Model) => {
    class Students extends Model { }

    Students.init({
        // basic info
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        dateOfBirth: { type: DataTypes.DATE, allowNull: false },
        occupation: { type: DataTypes.STRING, },
        // contact info
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        addressLine1: { type: DataTypes.STRING, allowNull: false },
        addressLine2: { type: DataTypes.STRING, },
        pin: { type: DataTypes.STRING, },
        // course info
        course: { type: DataTypes.STRING, allowNull: false },
        dateOfAdmission: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        admissionNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
        // gaurdian info
        nameOfGaurdian: { type: DataTypes.STRING, allowNull: false },
        phoneOfGaurdian: { type: DataTypes.STRING },
        // settings
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        hasGraduated: { type: DataTypes.BOOLEAN, defaultValue: false },
        isPresent: { type: DataTypes.BOOLEAN, defaultValue: false },

        // performance
        performanceListening: { type: DataTypes.INTEGER, defaultValue: 0 },
        performanceSpeaking: { type: DataTypes.INTEGER, defaultValue: 0 },
        performanceReading: { type: DataTypes.INTEGER, defaultValue: 0 },
        performanceWriting1: { type: DataTypes.INTEGER, defaultValue: 0 },
        performanceWriting2: { type: DataTypes.INTEGER, defaultValue: 0 },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Students'
    });

    return Students;
}